import { randomMovie } from "@/app/api/actions/randomMovie";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

const BillBoard = async () => {
  const response = await randomMovie();
  const data = await response.json();
  const movie = data.randomMovie[0];
  return (
    <div className="w-full h-[56.25vw]">
      <video
        poster={movie.thumbnailUrl}
        autoPlay
        muted
        loop
        className="h-[56.25vw] w-full object-cover brightness-[60%]"
        src={movie.videoUrl}
      />
      <div className="top-[35%] ml-16 absolute">
        <h1 className="text-4xl capitalize font-bold">{movie.title}</h1>
        <p className="text-[17px] mt-3 capitalize w-[60%]">
          {movie.description}
        </p>
        <div className="flex gap-5 mt-5">
          <button className="capitalize text-xl flex justify-center items-center gap-2 font-semibold rounded-md bg-[#fff] text-black py-2 px-4">
            <FaPlay />
            Play
          </button>
          <button className="capitalize text-xl flex justify-center items-center gap-2 font-semibold rounded-md bg-[#67615D] py-2 px-4">
            <FiInfo />
            more info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
