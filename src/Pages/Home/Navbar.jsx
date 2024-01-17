import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [close, setClose] = useState(false);

  const closeHandler = () => {
    setClose((prev) => !prev);
  };

  return (
    <div className="flex justify-between bg-[#2B2B2B] h-[70px] items-center relative">
      <img className="cursor-pointer w-36" src={Logo} alt="cipherguard logo" />
      <div className=" hidden md:block">
        <Link to={"/register"} className="text-white mr-8">
          Sign up
        </Link>
        <Link
          to={"/login"}
          className="bg-[#BFAFF2]  px-6 py-1 rounded-[15px] text-[#333333] "
        >
          Log in
        </Link>
      </div>
      {/* Mobile navigation */}
      <div className="text-4xl md:hidden text-white " onClick={closeHandler}>
        <HiMenu />
      </div>
      {/* Sidebar menu */}
      {close && (
        <div className="md:hidden fixed top-0 right-0 h-screen w-screen bg-[#2B2B2B] flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-3 px-6 text-white text-4xl"
            onClick={closeHandler}
          >
            <MdClose />
          </button>
          <Link
            onClick={closeHandler}
            to="/register"
            className="text-white font-medium my-5"
          >
            Sign up
          </Link>
          <Link
            onClick={closeHandler}
            to="/login"
            className="bg-[#BFAFF2] px-7 py-3 rounded-3xl font-medium text-[#333333] my-5"
          >
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
