import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { MobileSideBar, Sidebar, SidebarItem } from "../components/UserSidebar";
const MobileSidebarItems = [
  {
    icon: <PiVaultLight className="w-5 h-5" />,
    link: "/dashboard",
  },
  {
    icon: <GrDocumentNotes className="w-5 h-5" />,
    link: "/notes",
    active: true,
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
// import { Cookies } from "react-cookie";
import { PiVaultLight } from "react-icons/pi";
import { GrDocumentNotes } from "react-icons/gr";
import { RiAiGenerate } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import EnterVaultPin from "../components/EnterVaultPin";
import useVaultPinStore from "../Zustand/Vault_Pin";
import NoteSkeletonLoader from "../components/NoteSkeletonLoader";
import { MdErrorOutline } from "react-icons/md";
import saveNoteStore from "../Zustand/AddNewNote";
import AddNewNotes from "../components/AddNewNotes";
import EditNotes from "../components/EditNotes";
import { CiStickyNote } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";

const Notes = () => {
  const Profile = JSON.parse(localStorage.getItem("profile"));
  const { v_Pin } = useVaultPinStore();
  const [loader, setLoader] = useState(false);
  const [editNotes, setEditNotes] = useState(false);
  const [addNewNotes, setAddNewNotes] = useState(false);
  const [checkVpin, setCheckVpin] = useState(false);
  const [getNotes, setGetNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentEditId, setCurrentEditId] = useState(null);
  const [text, setText] = useState("");
  // const cookies = new Cookies();
  const { New_Note } = saveNoteStore();
  const getAllNote = async () => {
    setLoader(true);
    //   const token = cookies.get("token") || localStorage.getItem("token");
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/note/getAllNote`, "", {
        withCredentials: true,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${v_Pin.data}`,
        },
      })
      .then(function (response) {
        //   console.log(response.data.data);
        setGetNotes(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
        //   console.log(error.response.data.message);
      });
  };

  //* Edit Existing Notes
  const handleEditNotes = (id) => {
    setEditNotes((prev) => !prev);
    setCurrentEditId(id);
  };
  const handleSaveNotes = async (data) => {
    // Close the modal and perform logout
    try {
      setLoader(true);
      // console.log(data);
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/note/updateNote/${currentEditId}`,
        data,
        {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${v_Pin.data}`,
          },
        }
      );
      // console.log(response);
      toast.success(response.data.message); // Close the modal
      getAllNote();
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      setLoader(false);
    }
    setEditNotes(false);
    // window.location.reload();
  };

  const handleEditNotesCancel = () => {
    // Close the modal without logging out
    setEditNotes(false);
  };
  const handleEditNotesTrash = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/note/deleteNote/${currentEditId}`,
        " ",
        {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${v_Pin.data}`,
          },
        }
      );
      // console.log(response);
      toast.success(response.data.message); // Close the modal
      getAllNote();
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      setLoader(false);
    }
    setEditNotes(false);
  };

  // console.log(formData);
  //* Add new Note
  const handleNewNote = () => {
    setAddNewNotes((prev) => !prev);
  };
  const handleSaveNewNote = async () => {
    //* Close the modal
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/createNote`,
        New_Note.formData,
        {
          withCredentials: true,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${v_Pin.data}`,
          },
        }
      );
      // console.log(response);
      setAddNewNotes(false);
      toast.success(response.data.message);
      getAllNote();
      setLoader(false);
    } catch (error) {
      setAddNewNotes(false);
      toast.error(error.response.data.message || "An error occurred");
      setLoader(false);
    }
  };
  const handleNewNoteCancel = () => {
    setAddNewNotes(false);
  };

  //* refresh all Note
  useEffect(() => {
    if (!v_Pin.data) {
      setCheckVpin(false);
    } else if (v_Pin.data) {
      setCheckVpin(true);
    }
    getAllNote();
  }, []);
  //* Search Note
  const handelSearch = (value) => {
    if (!value) {
      getAllNote();
    } else {
      const searchResult = getNotes.filter((name) =>
        new RegExp(value, "i").test(name.name)
      );
      setGetNotes(searchResult);
    }
  };

  return (
    <main className=" flex h-screen overflow-hidden pr-4 py-4 bg-black">
      <Helmet>
        <title> {Profile.firstName}'s Notes</title>
        <meta name="description" content="" />
      </Helmet>
      <Sidebar>
        <Link to={"/vault"}>
          <SidebarItem
            icon={<PiVaultLight className=" w-5 h-5" />}
            text={"Vault"}
          />
        </Link>
        <Link to={"/notes"}>
          <SidebarItem
            icon={<GrDocumentNotes className=" w-5 h-5" />}
            text={"Notes"}
            active={true}
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
          <div className="w-full flex flex-col justify-center lg:items-center gap-y-3 transition-all">
            {/* filter section */}
            <div className="w-full h-fit flex flex-col gap-2 lg:max-w-xl border border-neutral-500 rounded-md p-4">
              <p className=" uppercase font-semibold">Filters</p>
              <div className=" flex items-center gap-2 shadow-md p-2.5 rounded-lg">
                <div className=" w-fit">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  className=" focus:outline-none w-full lg:w-fit bg-transparent text-base"
                  placeholder="Search Notes"
                  onChange={(e) => handelSearch(e.target.value)}
                />
              </div>
            </div>
            {/* Note section */}
            <div className="w-full h-[70vh] lg:max-w-xl flex flex-col p-4 border border-neutral-500 rounded-md">
              <div className=" flex justify-between">
                <p className="uppercase font-semibold ">My Notes</p>
                <button className="font-semibold text-2xl relative rounded-md transition-transform group hover:text-neutral-600">
                  <IoMdAdd onClick={handleNewNote} />
                  <div className="absolute w-20 hidden -bottom-1.5 rounded-md px-2 py-2 bg-black text-white text-sm opacity-0 transform -translate-x-full transition-transform group-hover:opacity-100 group-hover:block group-hover:translate-y-0 shadow-md">
                    Add new
                  </div>
                </button>
              </div>
              {/* Note */}
              {loader ? (
                <NoteSkeletonLoader />
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
                  {getNotes.map((value, index) => (
                    <>
                      <div
                        key={index}
                        className=" w-full flex items-center justify-between border-t border-neutral-400 py-2.5 px-4 hover:bg-neutral-100 transition-all cursor-pointer overflow-y-auto no-scrollbar"
                        onClick={() => handleEditNotes(value._id)}
                      >
                        <CiStickyNote className="w-6 h-6" />
                        <div className=" w-full mx-3">
                          <p className=" text-blue-800 font-semibold break-all text-base">
                            {value.name}
                          </p>
                        </div>
                      </div>
                      <EditNotes
                        isOpen={editNotes}
                        onClose={handleEditNotesCancel}
                        onConfirm={handleSaveNotes}
                        onTrash={handleEditNotesTrash}
                        onUserData={
                          getNotes.find((item) => item._id === currentEditId) ||
                          {}
                        }
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
      <AddNewNotes
        isOpen={addNewNotes}
        onConfirm={handleSaveNewNote}
        onClose={handleNewNoteCancel}
      />
    </main>
  );
};

export default Notes;
