import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PostsLayout from "../components/PostsLayout";
import contactListApi from "../api/contactListApi";
import getChatMessages from "../api/getChatMessages";
import messageSeenApi from "../api/messageSeenApi";
import createChatRoomApi from "../api/createChatRoomApi";
import insyncbgi from '../assets/insyncbgi.jpg'

// import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

const MessagesPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState([]);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [bg, setBg] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contactListApi();
        setProfiles(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = (event) => {
  //       const message = JSON.parse(event.data);
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //     };
  //   }
  // }, [ws]);


  const checkAccessToken = () =>{
    console.log("ACCESS TOKEN***********************");
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    console.log("ACCESS TOKEN***********************")
  }


  useEffect(() => {
    let messageListener;
    if (ws) {
      messageListener = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      ws.addEventListener('message', messageListener);
    }
    return () => {
      if (ws) {
        ws.removeEventListener('message', messageListener);
      }
    };
  }, [ws]);
  

  const handleSendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      ws.send(JSON.stringify({ message: inputMessage }));
      setInputMessage("");
    }
  };
  
  const joinChatroom = async (userId) => {
    try {
      const data = await createChatRoomApi(userId);
      const accessToken = localStorage.getItem("access_token");
      const websocketProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
      // const wsUrl = `${websocketProtocol}${window.location.host}/ws/chat/${data.id}/?token=${accessToken}`;
      const wsUrl = `ws://localhost:8000/ws/chat/${data.id}/?token=${accessToken}`
      const newChatWs = new WebSocket(wsUrl);
      setBg(true);

      newChatWs.onopen = async () => {
        console.log("Chatroom WebSocket connection opened.");
        // Fetch previous messages when the WebSocket connection is opened
        const previousMessages = await getChatMessages(data.id);
        setMessages(previousMessages);
        await messageSeenApi(userId);
        setProfiles((prevProfiles) => {
          return prevProfiles.map((profile) => {
            if (profile.id === data.id) {
              // Set unseen_message_count to zero
              return { ...profile, unseen_message_count: 0 };
            }
            return profile;
          });
        });
      };
      newChatWs.onclose = () => {
        console.log("Chatroom WebSocket connection closed.");
        // You can perform any necessary cleanup here when the WebSocket connection is closed.
      };
      newChatWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        // Handle incoming messages from the chatroom WebSocket
      };

      setWs(newChatWs);
    } catch (error) {
      console.error(error);
    }
    setSelectedProfile(userId)
  };

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <PostsLayout>
      {/* style={{backgroundImage: `url(${insyncbgi})`}} */}
      <div className="flex h-screen bg-[#000000] p-2" style={{backgroundImage: `url(${insyncbgi})`, backgroundSize: 'cover',}}>
        <div class="flex flex-col flex-grow w-3/5 mt-20 p-1 m-2 bg-white shadow-xl rounded-lg overflow-hidden">
          {bg ? (
            <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {messages.map((message, index) =>
                message.sender_email === user.email ? (
                  <div
                    key={index}
                    class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  >
                    <div>
                      <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                        <p class="text-sm">
                          {message.message ? message.message : message.content}
                        </p>
                      </div>
                      <span class="text-xs text-gray-500 leading-none">
                        {message.created} ago
                      </span>
                    </div>
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  </div>
                ) : (
                  <div key={index} class="flex w-full mt-2 space-x-3 max-w-xs">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                    <div>
                      <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                        <p class="text-sm">
                          {message.message ? message.message : message.content}
                        </p>
                      </div>
                      <span class="text-xs text-gray-500 leading-none">
                        {message.created} ago
                      </span>
                    </div>
                  </div>
                )
              )}
              <div class="flex-grow"></div>
              <div class="bg-[#f2dfcf] p-4 rounded-xl">
                <div class="relative flex w-full flex-wrap items-stretch">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-[#4b2848] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    aria-describedby="button-addon1"
                  />
                  <button
                    class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#4b2848] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    onClick={handleSendMessage}
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <span class="material-symbols-outlined">send</span>
                  </button>
                  {/* <button onClick={checkAccessToken}>Check</button> */}
                </div>
              </div>
            </div>
          ) : (
            <div class="flex flex-col flex-grow p-4 overflow-auto">
              {/* <img class="mx-auto my-auto" src="/next_node.png" alt="" /> */}
            </div>
          )}
        </div>
        <div className="w-2/5 mt-20 p-1 m-2 overflow-y-auto bg-white rounded-lg">
          {profiles
            ? profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => joinChatroom(profile.id)}
                  className={`relative flex items-center rounded-lg m-1 cursor-pointer ${
                    selectedProfile === profile.id ? "bg-[#4c4c4c]" : "bg-[#f2dfcf]"
                  } p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]`}
                >
                  {profile.unseen_message_count > 0 && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 rounded-full">
                      {profile.unseen_message_count}
                    </div>
                  )}

                  <img
                    className="w-14 rounded-full mr-2"
                    src={profile.profile_image}
                    alt="profile"
                  />
                  <div className="flex-grow">
                    <h5 className="mb-1 text-sm font-medium leading-tight text-neutral-800 text-center">
                      {profile.first_name} {profile.last_name} 
                    </h5>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </PostsLayout>
  );
};

export default MessagesPage;
