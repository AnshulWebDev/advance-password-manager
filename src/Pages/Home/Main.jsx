import Features from "./Features";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Companies from "./companies ";
import Quote from "./Quote";
import Contact from "./Contact";
import Footer from "./Footer";
const Main = () => {
  return (
    <div className="bg-[#2B2B2B] md:px-24 px-8 h-full">
      <Navbar />
      <Hero />
      <Companies />
      <Features />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
};

export default Main;
