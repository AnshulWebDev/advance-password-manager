import { Link } from "react-router-dom";
import AssetImg from "../../assets/mail.png";
const Contact = () => {
  return (
    <>
      <div className=" flex justify-between flex-wrap mt-20 mb-5">
        {/* left div */}
        <div className=" lg:w-1/2 w-full flex flex-col justify-center lg:flex-none  lg:text-justify text-center text-white">
          <div className=" lg:text-5xl text-4xl lg:leading-snug  font-black leading-snug">
            Questions? <br />
            Let’s talk
          </div>
          <div className=" mt-4 text-neutral-500 ">
            Contact us on{" "}
            <a href="mailto:admin@devglimpse.com">admin@devglimpse.com</a>
          </div>
          <div className=" text-neutral-500 ">We’re always happy to help!</div>

          <div>
            <button className="bg-[#F8D57E] text-[#333333] text-lg px-6 py-1 rounded-[15px] mt-8 ">
              <Link to={"/register"}>Get started</Link>
            </button>
          </div>
        </div>

        {/* Right div */}
        <div className=" w-full flex justify-center items-center lg:mt-0 mt-12 lg:mr-24 lg:w-fit">
          <img src={AssetImg} className=" lg:w-48 w-40" alt="" />
        </div>
      </div>
      <div className="h-0.5 w-full bg-neutral-600 mt-20"></div>
    </>
  );
};

export default Contact;
