import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";
const EditPasswdUsername = ({ isOpen, onClose, onConfirm,onTrash }) => {
    
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-5 "></div>

        <div className="relative bg-white p-8 w-96 rounded-xl">
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
                <label htmlFor="">Url</label>
                <div className=" flex w-full">
                  <input
                    className=" bg-neutral-50 w-[80%] focus:outline-none border  border-neutral-400 rounded-l-md p-2"
                    type="text"
                  />
                  <div className="bg-neutral-50 w-12 h-12 border flex items-center justify-center border-neutral-400">
                    <RxOpenInNewWindow className=" w-7 h-7" />
                  </div>
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
              <button
                className="px-4 py-2 text-white hover:text-neutral-100 bg-black rounded-md"
                onClick={onConfirm}
              >
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
              onClick={onTrash}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPasswdUsername;
