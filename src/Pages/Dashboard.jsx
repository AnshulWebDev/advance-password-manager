import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { MobileSideBar, Sidebar, SidebarItem } from "../components/UserSidebar";
const MobileSidebarItems = [
  {
    icon: <PiVaultLight className="w-5 h-5" />,
    link: "/dashboard",
    active: true,
  },
  {
    icon: <GrDocumentNotes className="w-5 h-5" />,
    link: "/notes",
  },
  {
    icon: <RiAiGenerate className="w-5 h-5" />,
    link: "/generator",
  },
  {
    icon: <IoSettingsOutline className="w-5 h-5" />,
    link: "/settings",
  },
];
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { PiVaultLight } from "react-icons/pi";
import { GrDocumentNotes } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import SquareLoader from "../components/SquareLoader";
import { FaSearch } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative bg-white p-8 w-96 rounded-md shadow-lg">
          <div className="flex flex-col">
            <div className=" flex justify-between items-center">
              <p className="text-2xl font-semibold uppercase text-black">
                Edit item
              </p>
            </div>

            <div className=" flex flex-col my-4 gap-2">
              <div className=" flex flex-col">
                <label htmlFor="">Name</label>
                <input
                  className=" bg-neutral-50 focus:outline-none border  border-neutral-400 rounded-md p-2"
                  type="text"
                />
              </div>
              <div className=" flex flex-col">
                <label htmlFor="">Username</label>
                <div className=" flex w-full">
                  <input
                    className=" bg-neutral-50 w-[90%] focus:outline-none border  border-neutral-400 rounded-l-md p-2"
                    type="text"
                  />
                  <div className="bg-neutral-50 w-12 h-12 border flex items-center justify-center border-neutral-400 rounded-r-md">
                    <MdOutlineContentCopy className=" w-7 h-7" />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col">
                <label htmlFor="">Password</label>
                <div className=" flex w-full">
                  <input
                    className=" bg-neutral-50 w-[80%] focus:outline-none border  border-neutral-400 rounded-l-md p-2"
                    type="password"
                  />
                  <div className="bg-neutral-50 w-12 h-12 border flex items-center justify-center border-neutral-400">
                    <FaEyeSlash className=" w-7 h-7" />
                  </div>
                  <div className="bg-neutral-50 w-12 h-12 border flex items-center justify-center border-neutral-400 rounded-r-md">
                    <MdOutlineContentCopy className=" w-7 h-7" />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col">
                <label htmlFor="">URL</label>
                <div className=" flex w-full">
                  <input
                    className=" bg-neutral-50 w-[90%] focus:outline-none border  border-neutral-400 rounded-l-md p-2"
                    type="text"
                  />
                  <div className="bg-neutral-50 w-12 h-12 border flex items-center justify-center border-neutral-400 rounded-r-md">
                    <MdOutlineContentCopy className=" w-7 h-7" />
                  </div>
                </div>
              </div>

              <div>
                <p>Updated: Aug 2, 2022, 2:49:56 PM</p>
                <p>Created: Aug 2, 2022, 2:49:56 PM</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center transition-all">
            <div>
              <button className="px-4 py-2 text-white hover:text-neutral-100 bg-black rounded-md">
                Save
              </button>
              <button
                className="ml-2 px-4 py-2 text-black border hover:bg-neutral-100 border-neutral-500 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
            <button
              className="ml-2 p-3 text-red-600 border border-neutral-500 hover:bg-neutral-100 bg-white rounded-md"
              onClick={onConfirm}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const Profile = JSON.parse(localStorage.getItem("profile"));
  const [loader, setLoader] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [passwdModal, setPasswdModal] = useState(false);
  const handelSearch = (value) => {
    setSearchInput(value);
    console.log(searchInput);
  };
  const handlePasswdModal = () => {
    setPasswdModal((prev) => !prev);
  };
  const handleLogoutConfirm = () => {
    // Close the modal and perform logout
    setPasswdModal(false);
  };

  const handleLogoutCancel = () => {
    // Close the modal without logging out
    setPasswdModal(false);
  };
  return (
    <main className=" flex h-screen overflow-hidden pr-4 py-4 bg-black">
      <Helmet>
        <title> {Profile.firstName}'s Dashboard</title>
        <meta name="description" content="Cipher Guard Dashboard." />
      </Helmet>
      <Sidebar>
        <Link to={"/vault"}>
          <SidebarItem
            icon={<PiVaultLight className=" w-5 h-5" />}
            text={"Dashboard"}
            active={true}
          />
        </Link>
        <Link to={"/notes"}>
          <SidebarItem
            icon={<GrDocumentNotes className=" w-5 h-5" />}
            text={"Notes"}
          />
        </Link>
        <Link to={"/generator"}>
          <SidebarItem
            icon={<RiAiGenerate className=" w-5 h-5" />}
            text={"Generator"}
          />
        </Link>
        <Link to={"/settings"}>
          <SidebarItem
            icon={<IoSettingsOutline className=" w-5 h-5" />}
            text={"Settings"}
          />
        </Link>
      </Sidebar>

      {/* mobile sidebar  */}
      <MobileSideBar items={MobileSidebarItems} />

      {/* //maincontent */}
      <main className=" w-full bg-white rounded-3xl p-4">
        {loader ? (
          <SquareLoader />
        ) : (
          <div className=" w-full flex flex-wrap justify-center lg:flex-nowrap gap-x-10 gap-y-7 transition-all">
            <div className="w-full flex flex-col gap-2 lg:w-fit border border-neutral-500 rounded-md p-4">
              <p className=" uppercase font-semibold">Filters</p>
              <div className=" flex items-center gap-2 shadow-md p-2.5 rounded-lg">
                <div className=" w-fit">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  className=" focus:outline-none w-full lg:w-fit bg-transparent text-base"
                  placeholder="Search logins"
                  onChange={(e) => handelSearch(e.target.value)}
                />
              </div>
              <div className=" flex items-center gap-2 cursor-pointer hover:text-neutral-600">
                <FaRegStar />
                Favorites
              </div>
              <div className=" flex items-center gap-2 cursor-pointer hover:text-neutral-600">
                <MdPassword />
                Login
              </div>
            </div>
            <div className="w-full lg:max-w-xl flex flex-col p-4 border border-neutral-500 rounded-md ">
              <div className=" flex justify-between">
                <p className="uppercase font-semibold ">My vault</p>
                <button className="font-semibold text-2xl relative rounded-md transition-transform group hover:text-neutral-600">
                  <IoMdAdd />
                  <div className="absolute w-20 hidden -bottom-1.5 rounded-md px-2 py-2 bg-black text-white text-sm opacity-0 transform -translate-x-full transition-transform group-hover:opacity-100 group-hover:block group-hover:translate-y-0 shadow-md">
                    Add new
                  </div>
                </button>
              </div>

              <div
                className=" w-full flex items-center justify-between border-t border-neutral-400 py-2.5 px-4 hover:bg-neutral-100 transition-all cursor-pointer mt-4"
                onClick={handlePasswdModal}
              >
                <img
                  className="max-w-4 max-h-4"
                  src="https://heroic-entremet-634d21.netlify.app/assets/favicon-BQKrME5r.png"
                />
                <div className=" w-full ml-3">
                  <p className=" text-blue-800 font-semibold break-all text-base">
                    academy.hackthebox.com
                  </p>
                  <p className=" text-neutral-500 w-24 sm:w-56 text-ellipsis overflow-hidden text-sm">
                    anshulvishwakarma63521@gmail.com
                  </p>
                </div>
                <div className=" w-6 h-6">
                  <HiOutlineDotsVertical className=" w-6 h-6 text-xl text-right" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Modal
        isOpen={passwdModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </main>
  );
};

export default Dashboard;
