
const FeaturesCompnent = ({ heading, content, img }) => {
  return (
    <div className="flex items-center gap-6 space-y-2">
      <div className=" w-16 h-16 flext justify-center items-center">
        <img className="min-w-[50px]" src={img} alt="" />
      </div>
      <div className=" flex flex-col gap-1 w-fit">
        <div className=" text-white font-bold">{heading}</div>
        <div className=" text-white font-normal opacity-25">{content}</div>
      </div>
    </div>
  )
}

export default FeaturesCompnent