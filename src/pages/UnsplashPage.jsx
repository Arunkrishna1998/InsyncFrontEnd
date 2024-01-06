import React, { useEffect, useState } from "react";
import getUnsplashApi from "../api/getUnsplashApi";
import { useSelector } from "react-redux";

const UnsplashPage = () => {
  const { user } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUnsplashApi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if(user) {
      fetchData();
    }
  }, [user]);

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedLikesCount = post.liked_by_user ? post.likes - 1 : post.likes + 1;
        return {
          ...post,
          liked_by_user: !post.liked_by_user,
          likes: updatedLikesCount,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <>
      <div className="mt-2 rajdhani">
        {posts ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="block rounded-lg w-11/12 lg:w-5/6 min-w-min mx-auto mt-2 mb-2 p-2 text-[#4b2848] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#f8eeeb]"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h5
                      className="mb-2 ms-2 mt-2 text-xl font-bold cursor-pointer leading-tight text-[#4b2848]"
                    >
                      {post.user.name}
                    </h5>
                    
                  </div>

                  <div className="text-[#4b2848] cursor-pointer">
                    <span class="material-symbols-outlined">
                    more_vert
                    </span>
                  </div>
                </div>
                <img
                  className="rounded-lg mx-auto cursor-pointer"
                  src={post.urls.regular}
                  alt=""
                />
              </div>
              <div className="p-6">
                <p className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#4b2848] ">
                  {post.description}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#4b2848]">
                    Tags:{" "}
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag text-sm font-medium">
                        #{tag}&nbsp;
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center mb-4">
                  <p className="mr-2 raleway text-base">
                    Likes: &nbsp;{" "}
                    <span className="tektur">{post.likes ?? 0}</span>{" "}
                    &nbsp;
                  </p>

                  {post.liked_by_user ? (
                    <button
                      type="button"
                      onClick={() => handleLike(post.id)}
                      className="inline-block mr-2 rounded-full bg-[#4b2848] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleLike(post.id)}
                      className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </>
  );
};

export default UnsplashPage;
