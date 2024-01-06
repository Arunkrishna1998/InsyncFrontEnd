import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getUserPostsApi from "../api/getUserPostsApi";
import deletePostApi from "../api/deletePostApi";
import rePostApi from "../api/rePostApi";

import Layout from "../components/Layout";
import PostsModal from "../components/PostsModal";
import PostPageModal from "../components/PostPageModal";

const SettingsPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserPostsApi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    setPostId(postId);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setPostId(null);
  };

  const handleUpdatePost = (postId) => {
    setShowModal(true);
    setPostId(postId);
  };

  const closeModal = () => {
    setShowModal(false);
    setPostId(null);
  };

  const fetchData = async () => {
    try {
      const data = await getUserPostsApi();
      setPosts([])
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this post?");
    if (shouldDelete) {
      try {      
        await deletePostApi(postId);
        fetchData();
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

  const handleRePost = async(postId) => {
    try {      
      await rePostApi(postId);
      navigate(`/post/${postId}`);
      toast.success("Reposted successfully!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("Failure, not Reposted!", {
        position: "top-center",
      });
    }
  }

  if (!isAuthenticated) {
    navigate("/");
  }

  return (
    <Layout>
      <PostPageModal isVisible={showPostModal} onClose={closePostModal} postId={postId}/>
      <PostsModal isVisible={showModal} onClose={closeModal} postId={postId} />
      <main className="flex-1">
        <div className="relative mx-auto px-8 mt-16">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-[#000000]">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="lg:hidden">
                  <label for="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option selected>Manage Posts</option>

                    <option>Profile</option>

                    <option>Change Password</option>
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <p className="border-purple-500 cursor-pointer text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Manage Posts{" "}
                      </p>

                      <Link to={'/settings/profile'} className="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Profile{" "}
                      </Link>

                      <Link to={'/settings/password'} className="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Change Password{" "}
                      </Link>
                    </nav>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-gray-200">
                  {/* <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-[#4b2848]">
                      Posts
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      Manage your posts.
                    </p>
                  </div> */}
                  <div className="mt-6">
                    <table className="w-full border-collapse mt-4">
                      <thead className="text-[#4b2848]">
                        <tr>
                          <th className="px-4 py-2">Post image</th>
                          <th className="px-4 py-2">Post Description</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="raleway">
                        {posts?.map((post) => (
                          <tr key={post.id}>
                            <td className="px-4 py-2">
                              <img
                                className="rounded-full mx-auto cursor-pointer w-12"
                                src={post.post_img}
                                alt="Post"
                                onClick={()=>handlePostClick(post.id)}
                              />
                            </td>
                            <td className="px-4 py-2 max-w-[200px] truncate">
                              {post.content}
                            </td>
                            <td className="px-4 py-2 max-w-[200px] font-semibold text-sm text-center">
                              {post.is_deleted
                                ? (<span className="text-amber-600">Deleted</span>)
                                : post.is_blocked
                                ? (<span className="text-red-600">Blocked</span>)
                                : (<span className="text-green-600">Active</span>)}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {post.is_deleted ? (
                                <button
                                type="button"
                                onClick={()=>handleRePost(post.id)}
                                className="inline-block mx-auto rounded bg-lime-700 m-1 px-6 pb-2 pt-2.5 text-xs font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                              >
                                Repost
                              </button>
                              ) : post.is_blocked ? (
                                "blocked"
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    onClick={()=>handleUpdatePost(post.id)}
                                    className="inline-block rounded bg-amber-600 m-1 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                                  >
                                    <span className="material-symbols-outlined">
                                      edit_square
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block rounded bg-red-600 m-1 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                                    onClick={()=>handleDeletePost(post.id)}
                                  >
                                    <span className="material-symbols-outlined">
                                      delete
                                    </span>
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </Layout>
  );
};

export default SettingsPage;
