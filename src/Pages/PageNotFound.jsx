import Footer from "./Home/Footer";
import Navbar from "./Home/Navbar";
import { Helmet } from "react-helmet-async";
const PageNotFound = () => {
  return (
    <div className="bg-[#2B2B2B] md:px-24 px-8 h-full">
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Cipher Guard Login page." />
      </Helmet>
      <Navbar />
      <main class="h-screen w-full flex flex-col justify-center items-center bg-[#2B2B2B] ">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded">Page Not Found</div>
        <button class="mt-5">
          <a class=" inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span class=" inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span class=" px-8 py-3 bg-[#1A2238] border border-current">
              <a href="/">Go Home</a>
            </span>
          </a>
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default PageNotFound;
