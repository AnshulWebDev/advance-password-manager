import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { MobileSideBar, Sidebar, SidebarItem } from "../components/UserSidebar";
const MobileSidebarItems = [
  {
    icon: <MdDashboard className="w-5 h-5" />,
    text: "Dashboard",
    link: "/dashboard",
    active: true,
  },
  {
    icon: <HiUsers className="w-5 h-5" />,
    text: "Users",
    link: "/users",
  },
  {
    icon: <MdAnalytics className="w-5 h-5" />,
    text: "Analytics",
    link: "/analytics",
  },
  {
    icon: <IoSettingsSharp className="w-5 h-5" />,
    text: "Settings",
    link: "/setting",
  },
];
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { MdAnalytics } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
const Dashboard = () => {
  const Profile =
    JSON.parse(localStorage.getItem("profile"));
  return (
    <main className=" flex h-screen overflow-hidden pr-4 py-4 bg-black">
      <Helmet>
        <title> {Profile.firstName}'s Dashboard</title>
        <meta name="description" content="Cipher Guard Dashboard." />
      </Helmet>
      <Sidebar>
        <Link to={"/dashboard"}>
          <SidebarItem
            icon={<MdDashboard className=" w-5 h-5" />}
            text={"Dashboard"}
            active={true}
          />
        </Link>
        <Link to={"/users"}>
          <SidebarItem icon={<HiUsers className=" w-5 h-5" />} text={"Users"} />
        </Link>
        <Link to={"/analytics"}>
          <SidebarItem
            icon={<MdAnalytics className=" w-5 h-5" />}
            text={"Analytics"}
          />
        </Link>
        <Link to={"/setting"}>
          <SidebarItem
            icon={<IoSettingsSharp className=" w-5 h-5" />}
            text={"Settings"}
          />
        </Link>
      </Sidebar>

      {/* mobile sidebar  */}
      <MobileSideBar items={MobileSidebarItems} />

      {/* //maincontent */}
      <main className=" w-full bg-white rounded-3xl p-4">
          <div>
            this is dashboard
          </div>
      </main>
    </main>
  );
};

export default Dashboard;
