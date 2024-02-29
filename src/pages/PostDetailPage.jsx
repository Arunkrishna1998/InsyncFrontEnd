import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import getPostApi from "../api/getPostApi";
import likePostApi from "../api/likePostApi";
import deletePostApi from "../api/deletePostApi";
import followUserApi from "../api/followUserApi";
import reportPostApi from "../api/reportPostApi";
import createCommentApi from "../api/createCommentApi";
import deleteCommentApi from "../api/deleteCommentApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostsModal from "../components/PostsModal";
import CommentsModal from "../components/CommentsModal";
import Dropdown from "../components/DropDown";
import Layout from "../components/Layout";
import { BASE_URL } from "../config";

const PostDetailPage = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostApi(postId);
        setPost(data);
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, postId]);

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

  const fetchData = async () => {
    try {
      setPost(null);
      setComments([]);
      const data = await getPostApi(postId);
      setPost(data);
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const constructImageUrl = (imgPath) => {
    if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
      return imgPath;
    }
    return `${BASE_URL}${imgPath}`;
  };

  const handleDeletePost = async (postId) => {
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
  };

  const handleUpdatePost = (postId) => {
    setShowModal(true);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await createCommentApi(postId, content);
      setComments((prevComments) => [...prevComments, newComment]);
      setContent("");
      toast.success("Commented successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to post comment!", {
        position: "top-center",
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentApi(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      toast.success("Comment deleted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failed to delete comment!", {
        position: "top-center",
      });
    }
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
  };

  const handleToggleLikePost = async (e) => {
    try {
      await likePostApi(postId);
      fetchData();
      // e.preventDefault();
      // toast.success("Post Like toggled successfully!", {
      //   position: "top-center",
      // });
    } catch (error) {
      // toast.error("Failure, Post not Liked!", {
      //   position: "top-center",
      // });
    }
  };  

  const handleToggleFollow = async (userId) => {
    try {
      await followUserApi(userId);
      toast.success("User follow toggled successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failure, User not Followed!", {
        position: "top-center",
      });
    }
  };

  const profileView = (email) => {
    navigate(`/profile/${email}`);
  };
  return (
    <Layout>
      <PostsModal isVisible={showModal} onClose={closeModal} postId={postId} />
      <div className="mt-20 rajdhani grid grid-cols-1 mx-2 md:grid-cols-3">
        {post ? (
          <>
            <div className="block col-span-2 rounded-lg w-full mx-1 my-2 p-2 text-[#000000] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#f8eeeb]">
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
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
                          <p
                            title="Following"
                            className="text-xs border-2 rounded-md m-2 p-1"
                          >
                            {" "}
                            Following
                          </p>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Follow"
                          onClick={() => handleToggleFollow(post.author.id)}
                        >
                          <span class="material-symbols-outlined">
                            person_add
                          </span>
                        </button>
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
                  className="rounded-lg mx-auto"
                  src={constructImageUrl(post.post_img)}
                  alt=""
                  style={{width:'70%'}}
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

                  <button
                    type="button"
                    className={`inline-block mr-2 rounded-full ${
                      post.likes.includes(user.id) ? "bg-[#000000] text-white" : "bg-primary"
                    } px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal`}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleToggleLikePost}
                  >
                    <span className="material-symbols-outlined">thumb_up</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 rounded-lg w-full min-w-min mx-2 my-2 p-2 text-[#000000] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#f8eeeb]">
              <div className="flex flex-col overflow-y-auto scrollbar-hide space-y-4">
                <h2 className="text-lg font-bold mb-4">Comments</h2>
                {comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg flex flex-col shadow-md mt-4"
                  >
                    {comment?.user?.email === user?.email && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-700  text-xl self-end"
                      >
                        x
                      </button>
                    )}
                    <h3 className="text-sm font-bold">
                      {comment.user.first_name} {comment.user.last_name}
                    </h3>
                    <p className="text-gray-700 rajdhani text-xs mb-2">
                      Posted {" "}
                      {comment.created} ago
                    </p>
                    <p className="text-gray-700 text-lg">{comment.body}</p>
                  </div>
                ))}
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold mb-2">Add a comment</h3>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="comment"
                    >
                      Comment
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="comment"
                      rows="3"
                      placeholder="Enter your comment"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="bg-[#000000] hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <p>No post available.</p>
        )}
      </div>
      <CommentsModal
        key={postId}
        postId={postId}
        isVisible={showCommentsModal}
        onClose={closeCommentsModal}
        comments={comments}
      />
      <ToastContainer />
    </Layout>
  );
};

export default PostDetailPage;
