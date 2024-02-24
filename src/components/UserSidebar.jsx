import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const SidebarContext = createContext();
import { Cookies } from "react-cookie";
import { toast } from "react-hot-toast";

export const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const cookies = new Cookies();
  const Profile =
    JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const logoutHandler = () => {
    cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    toast.success("Loggout");
    navigate("/");
  };
  return (
    <aside className="h-screen">
      <nav className="h-full hidden md:flex flex-col shadow-sm">
        <div
          className={`overflow-hidden transition-all ${
            expanded ? "pl-14 mt-12 mb-1" : "ml-1"
          }`}
        >
          <img
            className={`${
              expanded ? "w-16 rounded-2xl" : "w-9 rounded-lg mx-3 mt-5"
            }`}
            src={Profile.profileImg}
            alt=""
          />
          <p
            className={` text-2xl text-white font-semibold ${
              expanded ? "mt-2" : "hidden"
            }`}
          >
            {Profile.firstName}
          </p>
          <p
            className={` text-xs text-neutral-400 ${
              expanded ? "mt-2" : "hidden"
            }`}
          >
            {Profile.email}
          </p>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul
            className={`flex-1 overflow-hidden transition-all ${
              expanded ? "ml-14 mt-14" : "ml-2 mt-10"
            }`}
          >
            {children}
            <div onClick={logoutHandler}>
              <SidebarItem
                icon={<FaSignOutAlt className=" w-5 h-5" />}
                text={"Loggout"}
              />
            </div>
          </ul>
        </SidebarContext.Provider>
        <div className="p-4 pb-8 flex justify-end items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-neutral-600 hover:bg-neutral-400"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center py-4 pl-4 my-2
        font-medium rounded-l-full cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-white text-black"
            : "hover:bg-neutral-600 hover:text-white text-neutral-300"
        }
    `}
    >
      {icon}
      <span
        className={` overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
}

export const MobileSideBar = ({ items }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const Profile =
    JSON.parse(localStorage.getItem("admin_profile")) ||
    JSON.parse(localStorage.getItem("profile"));
  const logoutHandler = () => {
    cookies.remove("admin_token");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_profile");
    toast.success("Loggout");
    navigate("/");
  };
  return (
    <aside className="h-screen  ">
      <nav className="h-full flex md:hidden flex-col shadow-sm">
        <img
          className="w-9 rounded-lg mx-2.5 mt-5"
          src={Profile.profileImg}
          alt=""
        />

        <ul className="flex-1 mt-8">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`
                relative flex items-center py-4 px-5 my-2
                font-medium rounded-l-full cursor-pointer
                transition-colors group
                ${
                  item.active
                    ? " bg-white text-black"
                    : "hover:bg-neutral-600 hover:text-white text-neutral-300"
                }
              `}
            >
              {item.icon}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={logoutHandler}
            className={`
              relative flex items-center py-4 px-5 my-2
              font-medium rounded-l-full cursor-pointer
              transition-colors group hover:bg-neutral-600 hover:text-white text-neutral-300`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            <div
              className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-neutral-300 text-black text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              Logout
            </div>
          </button>
        </ul>
      </nav>
    </aside>
  );
};
