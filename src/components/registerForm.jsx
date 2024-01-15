"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        <FaUser className="mr-2" />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
          className="ml-2 p-2 border border-gray-400 rounded-md w-4/5 outline-none"
        />
      </label>

      <label className="flex items-center">
        <FaUser className="mr-2" />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="ml-2 p-2 border border-gray-400 rounded-md w-4/5 outline-none"
          required
        />
      </label>

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

      <label className="flex items-center">
        <MdPassword className="mr-2" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="ml-2 p-2 border border-gray-400 rounded-md w-4/5 outline-none"
          required
        />
      </label>

      <label className="flex items-center  relative">
        <MdPassword className="mr-2" />
        <input
          type={view ? "password" : "text"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
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
        Send otp
      </button>
    </form>
  );
};

export default RegisterForm;
