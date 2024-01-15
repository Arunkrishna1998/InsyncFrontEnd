import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import postapi from "../api/postapi";
import likePostApi from "../api/likePostApi";
import deletePostApi from "../api/deletePostApi";
// import followUserApi from "../api/followUserApi";
import reportPostApi from "../api/reportPostApi";
import searchPostApi from "../api/searchPostApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostsLayout from "../components/PostsLayout";
import PostsModal from "../components/PostsModal";
// import Comments from "../components/Comments";
import CommentsModal from "../components/CommentsModal";
import Dropdown from "../components/DropDown";
import PostPageModal from "../components/PostPageModal";
import InterestsModal from "../components/InterestsModal";
// import UnsplashPage from "../pages/UnsplashPage";
import { BASE_URL } from "../config";

const PostsPage = () => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  console.log("Home ",loading, user, isAuthenticated); 
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();
  const { search } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;      
      if (search) {
        data = await searchPostApi(search);
      } else {
        data = await postapi();
      }
      setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, search, setShowModal, setComments]);

  console.log("+++++++++POSTS++++++++");
  console.log(posts);
  console.log("+++++++++POSTS++++++++");



  useEffect(() => {
    if (user?.set_interest === false) {
      setShowInterestsModal(true);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-8 w-8 align-[0.125em] text-danger"
          role="status"
        >
          <span
            className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
            style={{ clip: "rect(0,0,0,0)" }}
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  const constructImageUrl = (imgPath) => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    return `${BASE_URL}${imgPath}`;
  };

  const handleDeletePost = async (postId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      try {      
        await deletePostApi(postId);
        toast.success("Post Deleted successfully!", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("Failure, Post not Deleted!", {
          position: "top-center",
        });
      }
    }
  };

  const handleUpdatePost = (postId) => {
    setShowModal(true);
    setPostId(postId);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleReportPost = async (postId) => {
    try {
      await reportPostApi(postId);
      toast.success("Post Reported successfully!", {
        position: "top-center",
      });
    } catch (err) {
      toast.error("Failure, Post not Reported!", {
        position: "top-center",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPostId(null);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setPostId(null);
  };

  // const handleClickComments = (postId, comments) => {
  //   setComments(comments);
  //   setPostId(postId);
  //   setShowCommentsModal(true);
  // };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setPostId(null);
  };

  const handleToggleLikePost = async (postId, isLiked) => {
    try {
      await likePostApi(postId);
  
      // Update the like count for the specific post
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((likeUserId) => likeUserId !== user.id)
              : [...post.likes, user.id],
            likes_count: isLiked
              ? post.likes_count - 1 
              : post.likes_count + 1,
          };
        }
        return post;
      });
  
      setPosts(updatedPosts);
      // toast.success("Post Like toggled successfully!", {
      //   position: "top-center",
      // });
    } catch (error) {
      toast.error("Failure, Post not Liked!", {
        position: "top-center",
      });
    }
  };

  // const handleToggleFollow = async (userId) => {
  //   try {
  //     await followUserApi(userId);
  //     toast.success("User follow toggled successfully!", {
  //       position: "top-center",
  //     });
  //   } catch (error) {
  //     toast.error("Failure, User not Followed!", {
  //       position: "top-center",
  //     });
  //   }
  // };

  const profileView = (email) => {
    navigate(`/profile/${email}`);
  };

  if (!loading && !isAuthenticated) {
    navigate('/');
  };

  return (
    <PostsLayout title="INSYNC | Home" content="Home page">
      <PostPageModal
        isVisible={showPostModal}
        onClose={closePostModal}
        postId={postId}
      />
      <PostsModal isVisible={showModal} onClose={closeModal} postId={postId} />
      <InterestsModal isVisible={showInterestsModal} onClose={() => setShowInterestsModal(false)} />
      <div className="mt-28 rajdhani">
        {posts ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="block rounded-lg w-11/12 lg:w-5/6 min-w-min mx-auto mt-2 mb-2 p-2 text-[#000000] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#f8eeeb]"
              style={{border:'2px solid #93d6fa'}}
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                  {/* <Link to={`/profile/${user.email}`}> */}
                    {/* <img
                      src={`${BASE_URL}${post.author.profile_image}`}
                      alt="Profile"
                      className="mb-4 h-auto rounded-full align-middle"
                      style={{ maxWidth: "50px" }}
                    /> */}
                  {/* </Link> */}
                    <h5
                      onClick={() => profileView(post.author.email)}
                      className="mb-2 ms-2 mt-2 text-xl font-bold cursor-pointer leading-tight text-[#000000]"
                    >
                      {post.author.first_name} {post.author.last_name}
                    </h5>
                    {post.author.email !== user.email &&
                      (post.followers &&
                      post.followers.some(
                        (follower) => follower.follower === user.email
                      ) ? (
                        <>
                          {/* <button
                          type="button"
                          className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title='Unfollow'
                          onClick={() => handleToggleFollow(post.author.id)}
                        >
                          <span class="material-symbols-outlined">person_remove</span>
                        </button> */}
                          <p
                            title="Following"
                            className="text-xs border-2 rounded-md m-2 p-1"
                          >
                            {" "}
                            Following
                          </p>
                        </>
                      ) : (
                        // <button
                        //   type="button"
                        //   className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                        //   data-te-ripple-init
                        //   data-te-ripple-color="light"
                        //   title="Follow"
                        //   onClick={() => handleToggleFollow(post.author.id)}
                        // >
                        //   <span class="material-symbols-outlined">
                        //     person_add
                        //   </span>
                        // </button>
                        <p
                            title="Following"
                            className="text-xs border-2 rounded-md m-2 p-1"
                          >
                            {" "}
                            Not Following
                          </p>
                      ))}
                  </div>

                  <div className="text-[#000000]">
                    <Dropdown
                      post={post}
                      handleDeletePost={handleDeletePost}
                      handleUpdatePost={handleUpdatePost}
                      handleReportPost={handleReportPost}
                    />
                  </div>
                </div>
                <img
                  onClick={() => handlePostClick(post.id)}
                  className="rounded-lg mx-auto cursor-pointer"
                  src={constructImageUrl(post.post_img)}
                  alt=""
                  style={{width:'50%'}}
                />
              </div>
              <div className="p-6">
                <p className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#000000] ">
                  {post.content}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#000000]">
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
                    <span className="tektur">{post.likes_count ?? 0}</span>{" "}
                    &nbsp;
                  </p>

                  {post.likes.includes(user.id) ? (
                    <button
                      type="button"
                      className="inline-block mr-2 rounded-full bg-[#45fdfd] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => handleToggleLikePost(post.id, true)}
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => handleToggleLikePost(post.id, false)}
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <div className="text-lg flex ms-6">
                  {/* <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickComments(post.id, post.comments)}
                  >
                    Comments:
                  </strong> */}
                </div>
                {/* <Comments comments={post.comments} /> */}
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      {/* <UnsplashPage /> */}
      <CommentsModal
        key={postId}
        postId={postId}
        isVisible={showCommentsModal}
        onClose={closeCommentsModal}
        comments={comments}
      />
      <ToastContainer />
    </PostsLayout>
  );
};

export default PostsPage;
