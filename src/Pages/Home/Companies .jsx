import { SiAccenture } from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { RiNetflixFill } from "react-icons/ri";
const Companies = () => {
  return (
    <>
      <div className=" flex flex-col justify-center text-xl text-white opacity-40 font-medium py-14">
        <div className="flex md:justify-evenly md:gap-0 w-full items-center justify-center flex-wrap gap-8">
          <div className=" flex flex-col items-center">
            <SiAccenture />
            <p>accenture</p>
          </div>
          <div className=" flex flex-col items-center">
            <FaApple />
            <p>Apple</p>
          </div>
          <div className=" flex flex-col items-center">
            <FaMicrosoft />
            <p>Microsoft</p>
          </div>
          <div className=" flex flex-col items-center">
            <FaGoogle />
            <p>Google</p>
          </div>
          <div className=" flex flex-col items-center">
            <RiNetflixFill />
            <p>Netflix</p>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white opacity-20"></div>
    </>
  );
};

export default Companies;
