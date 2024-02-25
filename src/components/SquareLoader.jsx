// SquareLoader.js
import React from "react";

const SquareLoader = () => {
  return (
    <div className="flex justify-center relative items-center h-full w-full">
      <div className=" absolute loader-square-8">
        <div className="cube1"></div>
        <div className="cube2"></div>
        <div className="cube3"></div>
        <div className="cube4"></div>
        <div className="cube5"></div>
        <div className="cube6"></div>
        <div className="cube7"></div>
        <div className="cube8"></div>
        <div className="cube9"></div>
      </div>
    </div>
  );
};

export default SquareLoader;
