import React, { useState } from "react";
import Logo2 from "../../../assets/Logo2.png";
import Profile from "../../../assets/Profile.jpg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import useStore from "../../configurations/useStore";
import { IoLogOut } from "react-icons/io5";
import useSidebar from "../../configurations/Base/useSidebar";
import { PiStudentFill } from "react-icons/pi";
import { PiBookFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";   

export default function Sidebar() {
  const { handleLogout } = useStore();
  const sidebar = useSidebar();
  const[openProfile,setOpenProfile] = useState(false)
  

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-teal-900 shadow-lg">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => {
                  sidebar.isSidebarOpen ? sidebar.close() : sidebar.open();
                }}
                className=" cursor-pointer hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium leading-5 rounded-lg text-sm p-2 focus:outline-none"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M5 7h14M5 12h14M5 17h10"
                  />
                </svg>
              </button>
              <a
                href="https://youtube.com/shorts/bknrDOdLkb0?si=iAaNAMMqtV12AOZ6"
                className="flex ms-2 md:me-24"
              >
                <img src={Logo2} className="h-11 me-3" alt="FlowBite Logo" />
                <span className="self-center  text-lg font-bold whitespace-nowrap dark:text-white">
                  WELCOME TO ARSH'S LIBRARY
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    onClick={()=> setOpenProfile(!openProfile)}
                    
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 cursor-pointer"
                  >
                     <span className="sr-only">Open user menu</span> 
                    <img
                      className="w-8 h-8 rounded-full"
                      src={Profile}
                      alt="user photo"
                    />
                  </button>
                </div>
                {openProfile && (
                 <div
                 onClick={()=>{
                  sidebar.close();
                 }} className="absolute right-3 top-14 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-44">
                    <div
                      className="px-4 py-3 border-b border-default-medium"
                      role="none"
                    >
                      <p className="text-bold text-body" role="none">Welcome, Arsh!</p>
                      <p className="text-sm text-body" role="none">arsha2980@gmail.com</p>
                      
                    </div>
                 
                    <ul
                      className="p-2 text-sm text-body font-medium"
                      role="none"
                    >
                      <li>
                        <button>
                        <a
                          href="/dashboard"
                          className="flex items-center w-full gap-2 px-4 py-2 hover:bg-teal-500 hover:text-white  rounded-md  cursor-pointer"
                          role="menuitem"
                        >
                           <RiDashboardHorizontalFill className="w-5 h-5 mr-2" /> 
                           Dashboard 
                        </a>
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full gap-2 px-4 py-2 hover:bg-red-500 hover:text-white  rounded-md  cursor-pointer"
                          role="menuitem"
                        >
                          <IoLogOut className="w-5 h-5 mr-2" /> 
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                {openProfile && <div onClick={()=> setOpenProfile(false)} className="fixed inset-0 z-40 bg-gray-800/70 "></div> }
                
              </div>
                
            </div>
          </div>
        </div>
      </nav>

      <aside
        className={`fixed top-0 bg-teal-900 left-0 z-40 w-64 h-full transition-transform ${sidebar.isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-200 shadow-lg">
          <a
            href="https://flowbite.com/"
            className="flex items-center ps-2.5 mb-5"
          >
            <img src={Logo2} className="h-6 me-3" alt="Flowbite Logo" />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">
              STUDENT BOOK MANAGEMENT
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group"
              >
                <RiDashboardHorizontalFill className="w-5 h-5" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/students'} className='flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group'>
              <PiStudentFill className="w-5 h-5" />
              <span className="ms-3">Students</span>
              </Link>
            </li>
            <li>
              <Link to={'/books'} className='flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group'>
              <PiBookFill className="w-5 h-5" />
              <span className="ms-3">Books</span>
              </Link>
            </li>
            <li>
              <Link to={'/allotments'} className='flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group'>
              <PiBookFill className="w-5 h-5" />
              <span className="ms-3">Allotment</span>
              </Link>
            </li>
            <li>
              <a href="/allotments/add" className="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group">
                <RiDashboardHorizontalFill className="w-5 h-5" />
                <span className="ms-3">Add Allotment</span>
              </a>
            </li>
            <li>
              <button onClick={handleLogout}
                className="flex items-center px-2 py-1.5 text-body text-red-500 rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group  cursor-pointer"
              >
                <IoLogOut className="w-5 h-5" />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {sidebar.isSidebarOpen && (
        <div
          onClick={() => sidebar.close()}
          className="fixed inset-0 z-30 bg-gray-800/70 "
        ></div>
      )}
    </>
  );
}