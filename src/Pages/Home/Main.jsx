import Features from "./Features";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Quote from "./Quote";
import Contact from "./Contact";
import Footer from "./Footer";
import Company from './Company';
const Main = () => {
  return (
    <div className="bg-[#2B2B2B] md:px-24 px-8 h-full">
      <Navbar />
      <Hero />
      <Company />
      <Features />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
};

export default Main;
