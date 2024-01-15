"use client";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const LoginForm = () => {
  const [formData, setFormData] = useState({
   
    email: "",
    password: "",

  });
  const [view, setView] = useState(false);
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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-5 flex flex-col gap-2 p-6 text-gray-600 "
    >
      
      <label className="flex items-center">
        <CiMail className="mr-2" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="ml-2 p-2 border border-gray-400 rounded-md w-4/5 outline-none"
          required
        />
      </label>
      <label className="flex items-center  relative">
        <MdPassword className="mr-2" />
        <input
          type={view ? "password" : "text"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
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
       Login
      </button>
      
    </form>
  )
}

export default LoginForm