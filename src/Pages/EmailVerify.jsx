import React from "react";
import { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import spaceArt from "../assets/registerArt.png";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const EmailVerify = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });
  const [view, setView] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const handlePasswdView = (e) => {
    setView((prev) => !prev);
  };
  return (
    <div className=" h-screen flex items-center">
      <Helmet>
        <title>otp verification</title>
      </Helmet>
      <div className=" mx-auto w-9/12 h-4/5 shadow-lg rounded-xl">
        <div className="flex h-full">
          {/* Left side */}
          <div className="hidden rounded-tl-2xl rounded-bl-2xl w-3/5 shadow-lg bg-[#2B2B2B] lg:flex flex-col justify-center items-center">
            <img src={spaceArt} className=" w-fit h-fit" />
            <p className=" font-semibold text-2xl text-white">
              Welcome aboard my friend
            </p>
            <p className=" text-white opacity-80">
              just a couple of clicks and we start
            </p>
          </div>
          {/* Right Side */}
          <div className="w-full  mx-auto  max-w-md lg:w-2/5 flex flex-col justify-center items-center">
            <div className="text-3xl">Email Verification</div>
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto mt-5 flex flex-col gap-2 p-6 text-gray-600 "
              >
                <label className="flex items-center  relative">
                  <RiLockPasswordLine className="mr-2" />
                  <input
                    type={view ? "password" : "text"}
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="OTP"
                    maxLength={8}
                    minLength={8}
                    className="ml-2 p-2 border border-gray-400 rounded-md w-4/5 outline-none"
                    required
                  />
                  <div
                    onClick={handlePasswdView}
                    className="absolute top-1/2 transform -translate-y-1/2 right-[15%]  cursor-pointer"
                  >
                    {view ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </label>
                <button
                  className="p-2 w-8/12 rounded-full text-white bg-[#BFAFF2] mx-auto"
                  type="submit"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
