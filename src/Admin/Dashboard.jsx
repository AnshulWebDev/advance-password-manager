import React from "react";
import { Sidebar, SidebarItem } from "../Components/Sidebar";
import { HiLockOpen } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { MdAnalytics } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
const Dashboard = () => {
  return (
    <main className=" flex bg-[#2B2B2B]">
      <Sidebar>
        <SidebarItem
          icon={<MdDashboard className=" w-5 h-5" />}
          text={"Dashboard"}
          active={true}
        />
        <SidebarItem icon={<HiUsers className=" w-5 h-5" />} text={"Users"} />

        <SidebarItem
          icon={<MdAnalytics className=" w-5 h-5" />}
          text={"Analytics"}
        />
        <SidebarItem
          icon={<HiLockOpen className=" w-5 h-5" />}
          text={"Unlock user"}
          alert={true}
        />
        <SidebarItem
          icon={<IoSettingsSharp className=" w-5 h-5" />}
          text={"Settings"}
        />
      </Sidebar>
      <div>hello this is andhuldvsdf</div>
    </main>
  );
};

export default Dashboard;
