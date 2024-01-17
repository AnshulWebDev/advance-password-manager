import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
const Navbar = () => {
  return (
    <div className="flex justify-between bg-[#2B2B2B] h-[70px] items-center">
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
      <a class="text-4xl md:hidden text-white " href="#">
        &#8801;
      </a>
    </div>
  );
};

export default Navbar;
