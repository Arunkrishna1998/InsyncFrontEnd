import React, { useState } from "react";
import { BASE_URL } from "../config";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import PostsModal from "./PostsModal";
import { Link, useNavigate } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

const PostsLayout = ({ title, content, children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSearchField, setShowSearchField] = useState(false);
  const [showUserSearchField, setShowUserSearchField] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');

  const toggleSearchField = () => {
    setShowSearchField((prevState) => !prevState);
  };

  const toggleSearchUserField = () => {
    setShowUserSearchField((prevState) => !prevState);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/home/${search}`);
    setSearch('')
    toggleSearchField();
  }


  const handleUserSearch = (e) => {
    e.preventDefault();
    navigate(`/user-search/${searchQuery}`);
    setSearchQuery('')
    toggleSearchUserField();
  }

  const createPost = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const sideNavVisibleClasses =
    "fixed left-0 top-20 z-[1035] h-full w-60 overflow-hidden bg-[#000000] md:data-[te-sidenav-hidden='false']:translate-x-0";
  const sideNavHiddenClasses =
    "fixed -translate-x-full left-0 top-20 z-[1035] h-full w-60 overflow-hidden bg-[#000000] md:data-[te-sidenav-hidden='false']:translate-x-0";

  const toggleSideNav = () => {
    setShowSideNav((prevState) => !prevState);
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      { isAuthenticated ?
      <>
      <Navbar />
      <div className="container mx-auto w-full" >
        <div className=" [&>*]:leading-[1.6]">
          <div className="bg-white">
            <button
              className="fixed bg-white p-1 border z-50 rounded-full top-20 right-0 md:hidden text-[#000000] "
              onClick={toggleSideNav}
            >
              <span class="material-symbols-outlined">side_navigation</span>
            </button>
          </div>
          <nav
            id="full-screen-example"
            className={
              showSideNav ? sideNavVisibleClasses : sideNavHiddenClasses
            }
            data-te-sidenav-init
            data-te-sidenav-mode-breakpoint-over="0"
            data-te-sidenav-mode-breakpoint-side="sm"
            data-te-sidenav-hidden="false"
            data-te-sidenav-color="dark"
            data-te-sidenav-content="#content"
            data-te-sidenav-scroll-container="#scrollContainer"
          >
            <div className="pt-6">
              <div id="header-content" className="flex flex-col items-center">
                {user && user.profile_image && (
                  <Link to={`/profile/${user.email}`}>
                    <img
                      src={`${BASE_URL}${user.profile_image}`}
                      alt="Profile"
                      className="mb-4 h-auto rounded-full align-middle"
                      style={{ maxWidth: "50px" }}
                    />
                  </Link>
                )}
                {user && (
                  <>
                    <h4 className="mb-2 text-2xl raleway text-white text-center font-medium leading-[1.2]">
                      {user.first_name ?? ""} {user.last_name ?? ""}
                    </h4>
                    <p className="mb-2 text-white raleway text-center">
                      {user.email ?? ""}
                    </p>
                    <p className="mb-2 text-white raleway text-center text-xs">
                      Following:{" "}
                    </p>
                    <p className="mb-2 text-white rajdhani text-center ">
                      {" "}
                      {user.following_count ?? "0"}
                    </p>
                    <p className="mb-2 text-white raleway text-center text-xs">
                      Followers:{" "}
                    </p>
                    <p className="mb-2 text-white rajdhani text-center">
                      {" "}
                      {user.follower_count ?? "0"}
                    </p>
                  </>
                )}
              </div>

              <hr className="border-gray-300" />
            </div>
            <div id="scrollContainer">
              <ul
                className="relative karla m-0 list-none px-[0.2rem]"
                data-te-sidenav-menu-ref
              >
                <li className="relative flex justify-center">
                  <a
                    className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white text-center outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-white hover:outline-none focus:bg-gray-300/30 focus:text-white focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    href="#!"
                    onClick={createPost}
                    data-te-sidenav-link-ref
                  >
                    <span class="material-symbols-outlined">post_add</span>
                    <span>&nbsp; Post</span>
                  </a>
                </li>
                <li className="relative flex justify-center">
                  <a
                    className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white text-center outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-white hover:outline-none focus:bg-gray-300/30 focus:text-white focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    href="#!"
                    onClick={toggleSearchUserField}
                    data-te-sidenav-link-ref
                  >
                    <span class="material-symbols-outlined">search</span>
                    <span>&nbsp; Search Friends</span>
                  </a>
                </li>

                <li className="relative flex justify-center">
                  <a
                    className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white text-center outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-white hover:outline-none focus:bg-gray-300/30 focus:text-white focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    href="#!"
                    onClick={toggleSearchField}
                    data-te-sidenav-link-ref
                  >
                    <span class="material-symbols-outlined">search</span>
                    <span>&nbsp; Search Posts</span>
                  </a>
                </li>
                <li className="relative flex justify-center">
                  <Link
                    className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white text-center outline-none transition duration-300 ease-linear hover:bg-gray-300/30 hover:text-white hover:outline-none focus:bg-gray-300/30 focus:text-white focus:outline-none active:bg-gray-300/30 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                    to={'/settings'}
                    data-te-sidenav-link-ref
                  >
                    <span class="material-symbols-outlined">settings</span>
                    <span>&nbsp; Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="absolute bottom-0 h-24 w-full bg-inherit text-center">
              <hr className="mb-6 border-gray-300" />
              <p className="text-white text-center ">insync</p>
            </div>
          </nav>

          <div
            className="min-h-screen w-full !pl-0 text-center md:!pl-60"
            id="content"
          >
            <PostsModal isVisible={show} onClose={() => setShow(false)} />
            <div className="">
              {showSearchField && (
                <form onSubmit={handleSearch}>
                  <div className="bg-white w-fit fixed rounded-lg right-5 z-30 flex items-center">
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                      className="border p-2 rounded-xl"
                    />
                    <button type='submit' className="bg-[#757575] text-white px-4 py-1 rounded-full">
                      <span class="material-symbols-outlined">image_search</span>
                    </button>
                  </div>
                </form>
              )}
              {showUserSearchField && (
                <form onSubmit={handleUserSearch}>
                  <div className="bg-white w-fit fixed rounded-lg right-5 z-30 flex items-center">
                    <input
                      type="text"
                      placeholder="Search User"
                      value={searchQuery}
                      onChange={(e)=>setSearchQuery(e.target.value)}
                      className="border p-2 rounded-xl"
                    />
                    <button type='submit' className="bg-[#757575] text-white px-4 py-1 rounded-full">
                      <span class="material-symbols-outlined">image_search</span>
                    </button>
                  </div>
                </form>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
      </>
      : <NotFoundPage/> }
    </>
  );
};
export default PostsLayout;
