import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user";
import { Sidenav, initTE } from "tw-elements";
import Unauthorized from "./Unauthorized";
import insynclogo from "../assets/insynclogo.png"

const AdminSideBar = ({ children }) => {
  initTE({ Sidenav });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuperuser } = useSelector((state) => state.user);

  const onClick = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {isSuperuser ? (
        <div>
          <nav
            id="sidenav-1"
            className="absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-black shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-mode="side"
            data-te-sidenav-content="#content"
          >
            <a
              className="mb-3 flex items-center text-white justify-center py-6 outline-none"
              href="#!"
              data-te-ripple-init
              data-te-ripple-color="primary"
            >
              <img
                id="te-logo"
                className="mr-2 rounded-full w-8"
                src={insynclogo}
                alt="TE Logo"
                draggable="false"
                style={{width:'200px'}}
              />
              {/* <h2>Insync</h2> */}
              {/* <span>Insync Admin</span> */}
            </a>

            <ul
              className="relative m-0 list-none px-[0.2rem]"
              data-te-sidenav-menu-ref
            >
              {/* <li className="relative">
            <Link
              className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
              to={'/admin'}
              data-te-sidenav-link-ref>
              <span
                className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                <i class="fa fa-home" aria-hidden="true"></i>
              </span>
              <span>Dashboard</span>
            </Link>
          </li> */}
              <li className="relative">
                <Link
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  to={"/admin/post"}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span style={{color:"white"}}>Posts</span>
                </Link>
              </li>
              <li className="relative">
                <Link
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  to={"/admin/user"}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span style={{color:"white"}}>Users</span>
                </Link>
              </li>
              <li className="relative">
                <Link
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  to={"/admin/blocked"}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span style={{color:"white"}}>Blocked Posts</span>
                </Link>
              </li>
              <li className="relative">
                <Link
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  to={"/admin/reported"}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span style={{color:"white"}}>Reported Posts</span>
                </Link>
              </li>

              <hr className="border-gray-300 mt-52" />

              <li className="relative">
                <p
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  onClick={onClick}
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span style={{color:"white"}}>Logout</span>
                </p>
              </li>
            </ul>
          </nav>

          <button
            className="fixed top-0 right-0 inline-block rounded bg-white px-6 py-2.5 text-xs font-medium uppercase leading-tight text-primary-700  shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            style={{ backgroundColor: "black" }}
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-1"
            aria-controls="sidenav-1"
            aria-haspopup="true"
          >
            <span className="block h-5 w-5 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div className="p-5 !pl-[260px] text-center" id="content">
            {children}
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default AdminSideBar;
