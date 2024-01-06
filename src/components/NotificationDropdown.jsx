import React from "react";

import notificationsSeenApi from "../api/notificationsSeenApi";
import { useNavigate } from "react-router-dom";

const NotificationDropdown = ({
  toggleNotification,
  notes,
  removeNotification,
}) => {
  const navigate = useNavigate();

  const getNotificationMessage = (notification) => {
    const { notification_type, post, comment } = notification;

    if (post) {
      if (notification_type === "like") {
        return "liked your post";
      } else if (notification_type === "comment") {
        return "commented on your post";
      } else if (notification_type === "post") {
        return "created a new post";
      } else if (notification_type === "blocked") {
        return "blocked you post";
      }
    } else if (comment) {
      if (notification_type === "comment") {
        return "replied to your comment";
      }
    }

    return "has started following you";
  };

  const onClick = async (note) => {
    try {
      await notificationsSeenApi(note.id);
      removeNotification(note.id);
      toggleNotification();

      if (note.from_user) {
        if (note.notification_type === "like" && note.post) {
          // Redirect to the liked post page
          navigate(`/post/${note.post}`);
        } else if (note.notification_type === "comment" && note.post) {
          // Redirect to the commented post page
          navigate(`/post/${note.post}`);
        } else if (note.notification_type === "post" && note.post) {
          // Redirect to the new post page
          navigate(`/post/${note.post}`);
        } else if (note.notification_type === "blocked") {
          // Redirect to a special "blocked" page
          // navigate(`/blocked`);
        } else {
          // Default redirection (e.g., profile or a general landing page)
          navigate(`/profile/${note.from_user.email}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") toggleNotification();
  };

  return (
    <div id="wrapper" onClick={handleClose}>
      <div>
        <ul
          className="absolute left-auto right-0 z-[10] float-left m-0 mt-10 min-w-max list-none overflow-hidden rounded-lg border-none bg-white text-[#4d2c4d] bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block"
          aria-labelledby="dropdownMenuButton1"
          data-te-dropdown-menu-ref
        >
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <li key={index}>
                <p
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline cursor-pointer"
                  onClick={() => onClick(note)}
                  data-te-dropdown-item-ref
                >
                  {note.notification_type === "blocked"
                    ? "Admin blocked your post"
                    : `${note.from_user.first_name} ${
                        note.from_user.last_name
                      } ${getNotificationMessage(note)}`}
                </p>
              </li>
            ))
          ) : (
            <li>
              <p className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline">
                No notifications
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationDropdown;
