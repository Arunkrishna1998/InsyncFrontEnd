import React, { useState } from 'react';
import { useSelector } from 'react-redux';


const Dropdown = ({ post, handleDeletePost, handleUpdatePost, handleReportPost }) => {
    const { user } = useSelector(state => state.user);
    const [showMenu, setShowMenu] = useState(false);
    
    const handleMenuClick = () => {
      setShowMenu(!showMenu);
    };
  
    const menuOptions = post.author.email === user.email ? [{ label: 'Delete' }, { label: 'Update' }] : [{ label: 'Report' }];
  
    return (
      <div className="relative raleway text-sm font-bold inline-block">
        <button
          type="button"
          className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#4b2848]]"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={handleMenuClick}
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
        {showMenu && (
          <div className="absolute right-0 top-0 mt-10 mr-2 bg-white text-[#4b2848] rounded-md shadow-lg">
            {menuOptions.map((menuItem) => (
              <div
                key={menuItem.label}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  if (menuItem.label === 'Delete') {
                    handleDeletePost(post.id);
                    handleMenuClick();
                  } else if (menuItem.label === 'Update') {
                    handleUpdatePost(post.id);
                    handleMenuClick();
                  } else if (menuItem.label === 'Report') {
                    handleReportPost(post.id);
                    handleMenuClick();
                  }
                }}
              >
                {menuItem.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default Dropdown;