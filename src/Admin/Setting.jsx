import React from "react";
import { MobileSideBar, Sidebar, SidebarItem } from "./Components/Sidebar";
import { HiLockOpen } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { MdAnalytics } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MobileSidebarItems = [
  {
    icon: <MdDashboard className="w-5 h-5" />,
    text: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <HiUsers className="w-5 h-5" />,
    text: "Users",
    link: "/admin/users",
  },
  {
    icon: <MdAnalytics className="w-5 h-5" />,
    text: "Analytics",
    link: "/admin/analytics",
  },
  {
    icon: <HiLockOpen className="w-5 h-5" />,
    text: "Unlock User",
    link: "/admin/unlock-user",
  },
  {
    icon: <IoSettingsSharp className="w-5 h-5" />,
    text: "Settings",
    link: "/admin/setting",
    active: true,
  },
];

const Setting = () => {
  return (
    <main className=" flex bg-[#2B2B2B]">
      <Helmet>
        <title>Admin - Settings</title>
      </Helmet>
      <Sidebar>
        <Link to={"/admin/dashboard"}>
          <SidebarItem
            icon={<MdDashboard className=" w-5 h-5" />}
            text={"Dashboard"}
          />
        </Link>
        <Link to={"/admin/users"}>
          <SidebarItem icon={<HiUsers className=" w-5 h-5" />} text={"Users"} />
        </Link>
        <Link to={"/admin/analytics"}>
          <SidebarItem
            icon={<MdAnalytics className=" w-5 h-5" />}
            text={"Analytics"}
          />
        </Link>
        <Link to={"/admin/unlock-user"}>
          <SidebarItem
            icon={<HiLockOpen className=" w-5 h-5" />}
            text={"Unlock user"}
          />
        </Link>
        <Link to={"/admin/setting"}>
          <SidebarItem
            icon={<IoSettingsSharp className=" w-5 h-5" />}
            text={"Settings"}
            active={true}
          />
        </Link>
      </Sidebar>

      <MobileSideBar items={MobileSidebarItems} />
      <div>Dashboard</div>
    </main>
  );
};

export default Setting;
