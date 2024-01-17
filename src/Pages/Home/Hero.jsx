import HeroImg from "../../assets/HeroImg.png";
import { SiAccenture } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-between  text-white ">
      <div className="flex flex-col items-center mx-auto mt-10">
        <h1 className=" font-semibold mb-[60px] text-center md:text-6xl text-4xl">
          CipherGuard
        </h1>
        <p className=" text-[18px] opacity-40 text-center">
          Master Your Digital Keys: CipherGuard - Where Security Meets
          Simplicity.
        </p>
        <Link
          to={"/register"}
          className="bg-[#F8D57E] text-[#333333] text-lg px-6 py-1 rounded-[15px] mt-[60px] "
        >
          Get Started
        </Link>
        <img src={HeroImg} className="mt-32 lg:w-full w-[80%]" alt="" />
      </div>
      <div className="h-0.5 w-full bg-white opacity-20"></div>
    </div>
  );
};

export default Hero;
