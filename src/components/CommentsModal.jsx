import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import createCommentApi from '../api/createCommentApi';
import deleteCommentApi from '../api/deleteCommentApi';
import { BASE_URL } from '../config';

const CommentsModal = ({ postId, isVisible, onClose, comments }) => {
  const { user } = useSelector(state => state.user);
  const [timeAgo, setTimeAgo] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const calculateTimeAgo = (commentTime) => {
      const currentTime = new Date();
      const timeDifference = currentTime - new Date(commentTime);
      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

      if (minutes < 60) {
        return `${minutes} minutes ago`;
      } else if (hours < 24) {
        return `${hours} hours ago`;
      } else {
        if(days===1){
          return `${days} day ago`
        } else{
          return `${days} days ago`
        }
      }
    };

    if (comments && comments.length > 0) {
      const timeAgoArray = comments.map((comment) =>
        calculateTimeAgo(comment.created)
      );
      setTimeAgo(timeAgoArray);
    }
  }, [comments]);

  const constructImageUrl = (imgPath) => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    return `${BASE_URL}${imgPath}`;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCommentApi(postId, content);
      onClose();
      toast.success('Comment posted successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failed to post comment!', {
        position: "top-center",
      });
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteCommentApi(commentId);
  };


  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 p-2 z-10 backdrop-blur-md flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-96 flex flex-col">
        <button onClick={onClose} className="text-white text-xl self-end">
          X
        </button>
        <div className="bg-[#747474] p-2 rounded">
          <div className="text-sm bg-white border h-64 overflow-y-auto">
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={comment.id} className="flex items-start p-4 border-b">
                  <div className="comment-img">
                    <img
                      className="w-10 rounded-full me-3"
                      src={constructImageUrl(comment.user.profile_image)}
                      alt="Comment profile"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center">
                      <strong className='karla text-base'>
                        {comment.user.first_name} {comment.user.last_name}
                      </strong>
                      <span className="text-xs ml-2">: {timeAgo[index]}</span>
                      {comment.user.email === user.email && (
                        <span>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-700 text-xl"
                          >
                            x
                          </button>
                        </span>
                      )}
                    </div>
                    <p className="raleway text-start"> {comment.body}</p>
                  </div>
                </div>
              ))
            ) : (
              <span>No comments yet</span>
            )}
          </div>
          <div className="p-2 bg-[#767676] border mt-2">
            <form onSubmit={handleSubmit}>
              <div
                className="relative p-2 mb-3"
                data-te-input-wrapper-init
              >
                <textarea
                  className="peer block min-h-[auto] w-full rounded border bg-white text-neutral-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlTextarea1"
                  rows="2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ borderBlockColor: 'white' }}
                  placeholder="Write Comment"
                ></textarea>
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-600 dark:peer-focus:text-primary"
                >
                  Comment
                </label>
              </div>
              <button
                type="submit"
                className="inline-block rounded bg-[#000000] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
