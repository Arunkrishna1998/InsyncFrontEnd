import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const Comments = ({ comments }) => {
  const [timeAgo, setTimeAgo] = useState('');

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
        return days===1? `${days} day ago`: `${days} days ago`;
      }
    };

    if (comments && comments.length > 0) {
      const lastComment = comments[comments.length - 1];
      const timeAgoString = calculateTimeAgo(lastComment.created);
      setTimeAgo(timeAgoString);
    }
  }, [comments]);

  const constructImageUrl = (imgPath) => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    return `${BASE_URL}${imgPath}`;
  };

  return (
    <div className="text-sm flex p-4 me-2 rounded-lg ms-2 mb-2 bg-white border">
      {comments && comments.length > 0 ? (
        comments.slice(comments.length - 1, comments.length).map((comment) => (
          <div key={comment.id} className='flex'>
            <div className="comment-img">
              <img
                className="w-10 rounded-full me-3"
                src={constructImageUrl(comment.user.profile_image)}
                alt="Comment profile"
              />
            </div>
            <div className='align-middle'>
              <strong>
                {comment.user.first_name} {comment.user.last_name}
              </strong>
              <span>: {comment.body}</span>
              <span className="text-xs self-end">: {timeAgo}</span>
            </div>
          </div>
        ))
      ) : (
        <span>No comments yet</span>
      )}
    </div>
  );
};

export default Comments;
