import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostsLayout from "../components/PostsLayout";
import getProfileApi from "../api/getProfileApi";
import followUserApi from "../api/followUserApi";
import UpdateProfileModal from "../components/UpdateProfileModal";
// import PostPageModal from '../components/PostPageModal';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // const [showPostModal, setShowPostModal] = useState(false);
  // const [postId, setPostId] = useState(null);

  const navigate = useNavigate();
  const param = useParams();
  const email = param.email;


useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProfileApi(email);
      setProfile(data.profile_user);
      setPosts(data.profile_posts);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
}, [email]);

if (loading) {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >
          Loading...
        </span>
      </div>
    </div>
  )
}

  const fetchData = async () => {
    try {
      setProfile(null);
      setPosts([]);
      const data = await getProfileApi(email);
      setProfile(data.profile_user);
      setPosts(data.profile_posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // const closePostModal = () => {
  //   setShowPostModal(false);
  //   setPostId(null);
  // };

  const handleToggleFollow = async (userId) => {
    try {
      // Make the API call to follow/unfollow the user
      await followUserApi(userId);

      // Update the profile state based on the action (follow/unfollow)
      setProfile((prevProfile) => {
        if (
          prevProfile.followers.some(
            (follower) => follower.follower === user.email
          )
        ) {
          // User was following the profile, so unfollowing now
          return {
            ...prevProfile,
            follower_count: prevProfile.follower_count - 1,
            followers: prevProfile.followers.filter(
              (follower) => follower.follower !== user.email
            ),
          };
        } else {
          // User was not following the profile, so following now
          return {
            ...prevProfile,
            follower_count: prevProfile.follower_count + 1,
            followers: [...prevProfile.followers, { follower: user.email }],
          };
        }
      });

      toast.success("User follow toggled successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failure, User not Followed!", {
        position: "top-center",
      });
    }
  };

  console.log("Email:", email);
  console.log("User Email:", user?.email);

  const handleClose = () => {
    fetchData();
    setShowModal(false);
  };

  return (
    <PostsLayout title="Profile" content="Profile page">
      {/* <PostPageModal isVisible={showPostModal} onClose={closePostModal} postId={postId}/> */}
      <UpdateProfileModal isVisible={showModal} onClose={handleClose} />
      <section className="pt-16 bg-blueGray-50 relative">
        <div className="w-full lg:w-5/6 px-4 mx-auto" >
          <div className="relative flex flex-col min-w-0 break-words bg-[#f8eeeb] w-full mb-6 shadow-xl rounded-lg mt-16"  >
            {email !== user?.email && (
              <div className="absolute top-0 right-0 m-2" >
                {profile?.followers &&
                profile?.followers.some(
                  (follower) => follower.follower === user.email
                ) ? (
                  <>
                    <button
                      type="button"
                      className="rounded-full bg-[#000000] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal flex items-center justify-center"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      title="Unfollow"
                      onClick={() => handleToggleFollow(profile.id)}
                    >
                      <span class="material-symbols-outlined">
                        person_remove
                      </span>
                      &nbsp;Unfollow
                    </button>
                    <p
                      title="Following"
                      className="text-xs border-2 rounded-md p-1"
                    >
                      {" "}
                      Following
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="rounded-full bg-[#000000] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal flex items-center justify-center"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      title="Follow"
                      onClick={() => handleToggleFollow(profile.id)}
                    >
                      <span class="material-symbols-outlined">person_add</span>
                      <span className="">&nbsp;Follow</span>
                    </button>

                    <p
                      title="Following"
                      className="text-xs border-2 rounded-md p-1"
                    >
                      {" "}
                      Not Following
                    </p>
                  </>
                )}
              </div>
            )}
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    {profile && profile.profile_image && (
                      <img
                        src={`${BASE_URL}${profile.profile_image}`}
                        alt="Profile"
                        className="mt-4 h-auto rounded-full align-middle"
                        style={{ width: "200px", borderRadius:'50%' }}
                      />
                    )}
                    {profile?.email === user?.email ? (
                      <div onClick={() => setShowModal(true)} className="absolute bottom-0 right-0 w-12 h-12 bg-[#000000] rounded-full flex justify-center items-center">
                        <span
                          className="material-symbols-outlined text-white cursor-pointer"
                        >
                          edit
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-full px-4 text-center text-[#000000] mt-5">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {profile?.follower_count ?? ""}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {profile?.following_count ?? ""}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Following
                      </span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide">
                        {posts?.length ?? ""}
                      </span>
                      <span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-[#000000] mt-5">
                <h3 className="text-xl font-semibold leading-normal mb-2">
                  {profile?.first_name ?? ""} {profile?.last_name ?? ""}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <span class="material-symbols-outlined">location_on</span>
                  &nbsp;
                  {profile?.country ?? "Country"}
                </div>
                <div className="mb-2 mt-10">
                  <span class="material-symbols-outlined">work</span>&nbsp;
                  {profile?.work ?? "Job"}
                </div>
                <div className="mb-2">
                  <span class="material-symbols-outlined">school</span>&nbsp;
                  {profile?.education ?? "University"}
                </div>
              </div>
            
              <div className="flex justify-center flex-wrap">
                {posts ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="p-2 border-t border-blueGray-200 text-center m-2 transition-transform transform-gpu hover:scale-110"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${BASE_URL}${post.post_img}`}
                          alt="post"
                          onClick={() => handlePostClick(post.id)}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          className="rounded-md cursor-pointer"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </PostsLayout>
  );
};

export default Dashboard;
