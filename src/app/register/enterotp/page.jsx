import spaceArt from "../../../../asset/registerArt.png";
import Image from "next/image";
import Link from "next/link"
import EmailOtp from "@/components/emailOtp"

const EnterOtp = () => {
  return (
    <div className=" h-screen flex items-center">
      <div className=" mx-auto w-9/12 h-4/5 shadow-lg rounded-xl">
        <div className="flex h-full">
          {/* Left side */}
          <div className="hidden rounded-tl-2xl rounded-bl-2xl w-3/5 shadow-lg bg-[#2B2B2B] lg:flex flex-col justify-center items-center">
            <Image src={spaceArt} width={"100px"} height={"100px"} />
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
              <EmailOtp />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterOtp