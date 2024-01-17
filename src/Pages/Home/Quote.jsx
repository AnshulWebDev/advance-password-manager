import Quotation from "../../assets/quotation.png" 
const Quote = () => {
  return (
    <>
      <div>
        <div className=" flex flex-col justify-center items-center py-20 bg-[#F8D57E] text-[#333333] rounded-[15px]">
          <div>
            <img className="w-16" src={Quotation} alt="" />
          </div>
          <div className=" w-2/3 text-center mt-1.5">
            Security is mostly a superstition. It does not exist in nature, nor
            do the children of men as a whole experience it. Avoiding danger is
            no safer in the long run than outright exposure. Life is either a
            daring adventure, or nothing.
          </div>
          <div className=" mt-10 text-sm opacity-50">Helen Keller</div>
        </div>
      </div>
    </>
  );
};

export default Quote;
