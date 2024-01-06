import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import getPostApi from "../api/getPostApi";
import createCommentApi from "../api/createCommentApi";
import deleteCommentApi from "../api/deleteCommentApi";
import { useSelector } from "react-redux";


const PostPageModal = ({ isVisible, onClose, postId }) => {
  const { user } = useSelector(state => state.user);
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostApi(postId);
        setPost(data);
        setComments(data.comments)
      } catch (error) {
        console.error(error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await createCommentApi(postId, content);
      setComments((prevComments) => [...prevComments, newComment]);
      toast.success('Post Updated successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failed to post comment!', {
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
      toast.success('Comment deleted successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failed to delete comment!', {
        position: "top-center",
      });
    }
  };
  

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 z-10 p-2 backdrop-blur-md flex justify-center md:items-center"
      onClick={handleClose}
    >
      <div className="flex flex-col overflow-y-auto scrollbar-hide w-11/12 mt-16 md:ms-12 md:w-4/6">
        <button onClick={onClose} className="text-white text-xl self-end">
          X
        </button>
        <div className="bg-[#818181] p-2 karla rounded">
          <div className="flex flex-col md:flex-row rounded-lg mb-2 p-2 text-[#4b2848] shadow-[0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)] bg-[#f8eeeb]">
            <div className="md:w-2/3 p-2">
              <img
                className="rounded-lg max-w-full mx-auto"
                src={post?.post_img}
                alt=""
              />
              <p className="text-gray-700">{post?.content}</p>
            </div>
            <div className="md:w-1/3">
              <div className="flex flex-col overflow-y-auto scrollbar-hide max-h-[400px] space-y-4">
                <h2 className="text-lg font-bold mb-4">Comments</h2>
                {comments?.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg flex flex-col shadow-md mt-4"
                  >
                    
                    {comment?.user?.email === user?.email && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)} 
                            className="text-red-700  text-xl self-end">
                          x
                        </button>
                      )}
                    <h3 className="text-lg font-bold">{comment.user.first_name} {comment.user.last_name}</h3>
                    <p className="text-gray-700 rajdhani text-xs mb-2">
                      Posted on {new Date(comment.created).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </p>
                    <p className="text-gray-700">{comment.body}</p>
                  </div>
                ))}
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
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
                    className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPageModal;
