import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";
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
import { FaRegEdit } from "react-icons/fa";
import EditPasswdUsername from "../components/EditPasswdUsername";
import AddNewLogins from "../components/AddNewLogins";
import EnterVaultPin from "../components/EnterVaultPin";
import useVaultPinStore from "../Zustand/Vault_Pin";
import SkeletonLoader from "../components/SkeletonLoader";
import { MdErrorOutline } from "react-icons/md";
import saveNewLoginsStore from "../Zustand/AddNewLoginDetails";

const Vault = () => {
  const Profile = JSON.parse(localStorage.getItem("profile"));
  const { v_Pin } = useVaultPinStore();
  const [loader, setLoader] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [editPasswdUsername, setEditPasswdUsername] = useState(false);
  const [addNewLogin, setAddNewLogin] = useState(false);
  const [checkVpin, setCheckVpin] = useState(false);
  const [getSavedPasswd, setGetSavedPasswd] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token") || localStorage.getItem("token");
  const { New_LoginDetails } = saveNewLoginsStore();
  const handelSearch = (value) => {
    setSearchInput(value);
    console.log(searchInput);
  };

  // Edit Existing Logins
  const handleEditPassUname = () => {
    setEditPasswdUsername((prev) => !prev);
  };
  const handleSavePassUname = () => {
    // Close the modal and perform logout
    setEditPasswdUsername(false);
  };

  const handleEditPassUnameCancel = () => {
    // Close the modal without logging out
    setEditPasswdUsername(false);
  };
  const handleEditPassUnameTrash = () => {
    setEditPasswdUsername(false);
  };

  // console.log(formData);
  //* Add new LOgins
  const handleNewLogin = () => {
    setAddNewLogin((prev) => !prev);
  };
  const handleSaveNewLogin = async () => {
    //* Close the modal
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/passwordVault/createPasswd`,
        New_LoginDetails,
        {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormData((prevData) => ({
        ...prevData,
        password: response.data.data,
      }));
      setLoader(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      setLoader(false);
    }
    setAddNewLogin(false);
  };

  const handleNewLoginCancel = () => {
    setAddNewLogin(false);
  };

  useEffect(() => {
    if (!v_Pin.data) {
      setCheckVpin(false);
    } else if (v_Pin.data) {
      setCheckVpin(true);
    }
    const getAllPassword = async () => {
      setLoader(true);
      //   const token = cookies.get("token") || localStorage.getItem("token");
      await axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/passwordVault/getAllPasswd`,
          "",
          {
            withCredentials: true,
            credentials: "include",
            headers: {
              Authorization: `Bearer ${v_Pin.data}`,
            },
          }
        )
        .then(function (response) {
          //   console.log(response.data.data);
          setGetSavedPasswd(response.data.data);
          setLoader(false);
        })
        .catch(function (error) {
          setErrorMessage(error.response.data.message);
          //   console.log(error.response.data.message);
        });
    };
    getAllPassword();
  }, []);
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
            text={"Vault"}
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
      <main className=" w-full bg-white rounded-3xl p-4 ">
        {/* <EnterVaultPin />         */}
        {checkVpin ? (
          <div className=" w-full flex flex-wrap justify-center lg:flex-nowrap gap-x-10 gap-y-7 transition-all">
            {/* Left filter section */}
            <div className="w-full h-fit flex flex-col gap-2 lg:w-fit border border-neutral-500 rounded-md p-4">
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

            {/* Right Password section */}
            <div className="w-full h-96 xsm:h-[24rem] md:h-[25rem] lg:h-[35rem] lg:max-w-xl flex flex-col p-4 border border-neutral-500 rounded-md">
              <div className=" flex justify-between">
                <p className="uppercase font-semibold ">My vault</p>
                <button className="font-semibold text-2xl relative rounded-md transition-transform group hover:text-neutral-600">
                  <IoMdAdd onClick={handleNewLogin} />
                  <div className="absolute w-20 hidden -bottom-1.5 rounded-md px-2 py-2 bg-black text-white text-sm opacity-0 transform -translate-x-full transition-transform group-hover:opacity-100 group-hover:block group-hover:translate-y-0 shadow-md">
                    Add new
                  </div>
                </button>
              </div>
              {/* password & username  */}
              {loader ? (
                <SkeletonLoader />
              ) : (
                <div className="mt-4 overflow-y-auto no-scrollbar">
                  {errorMessage ? (
                    <div className="text-red-500 w-full flex items-center gap-1">
                      <MdErrorOutline />
                      {errorMessage}
                    </div>
                  ) : (
                    ""
                  )}
                  {getSavedPasswd.map((value, index) => (
                    <>
                      <div
                        key={value._id}
                        className=" w-full flex items-center justify-between border-t border-neutral-400 py-2.5 px-4 hover:bg-neutral-100 transition-all cursor-pointer overflow-y-auto no-scrollbar"
                      >
                        <img className="w-5 h-5" src={value.websiteFavicon} />
                        <div className=" w-full mx-3">
                          <p className=" text-blue-800 font-semibold break-all text-base">
                            {value.name}
                          </p>
                          <p className=" text-neutral-500 w-24 sm:w-56 text-ellipsis overflow-hidden text-sm">
                            {value.username}
                          </p>
                        </div>
                        <div className=" w-6 h-6 flex items-center justify-center">
                          <FaRegEdit
                            onClick={handleEditPassUname}
                            className="w-5 h-5 cursor-pointer"
                          />
                        </div>
                      </div>
                      <EditPasswdUsername
                        isOpen={editPasswdUsername}
                        onClose={handleEditPassUnameCancel}
                        onConfirm={handleSavePassUname}
                        onTrash={handleEditPassUnameTrash}
                      />
                    </>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <EnterVaultPin />
        )}
      </main>
      <AddNewLogins
        isOpen={addNewLogin}
        onClose={handleNewLoginCancel}
        onConfirm={handleSaveNewLogin}
      />
    </main>
  );
};

export default Vault;
