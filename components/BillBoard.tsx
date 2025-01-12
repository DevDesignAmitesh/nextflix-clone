"use client"

import Link from "next/link";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Popup from "./Popup"; // Import Popup component
import { FiInfo } from "react-icons/fi";

const BillBoard = ({ email, movies }: { email: string, movies: any }) => {
  const [popupMovie, setPopupMovie] = useState<any | null>(null); // Track which movie's popup to show

  const openPopup = (movie: any) => {
    setPopupMovie(movie); // Open the popup for the clicked movie
  };

  const closePopup = () => {
    setPopupMovie(null); // Close the popup
  };

  return (
    <>
      {movies.map((movie: any) => (
        <div key={movie.id} className="w-full relative h-[56.25vw]">
          <video
            poster={movie.thumbnailUrl}
            autoPlay
            muted
            loop
            className="h-[56.25vw] w-full object-cover brightness-[60%]"
            src={movie.videoUrl}
          />
          <div className="sm:top-[35%] top-[25%] ml-5 sm:ml-16 absolute">
            <h1 className="text-[7vmin] capitalize font-bold">{movie.title}</h1>
            <p className="text-[2vmin] sm:mt-3 capitalize w-[80%] sm:w-[60%]">
              {movie.description}
            </p>
            <div className="flex gap-5 mt-2 sm:mt-5">
              <Link
                className="capitalize text-lg sm:text-xl flex justify-center items-center gap-2 sm:font-semibold font-medium rounded-md bg-[#fff] text-black py-0 sm:py-2 px-4"
                href={`/watch/${movie.id}`}
              >
                <FaPlay className="text-sm sm:text-xl" />
                Play
              </Link>
              {/* Info Button - Popup */}
              <button
                className="flex items-center gap-2 text-lg sm:text-xl sm:font-semibold font-medium rounded-md bg-[#67615D] py-2 px-4"
                onClick={() => openPopup(movie)} // Open popup for the clicked movie
                aria-label="More Info"
              >
                <FiInfo className="text-sm sm:text-xl" />
                More Info
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Show Popup when movie is clicked */}
      {popupMovie && <Popup email={email} movie={popupMovie} onClose={closePopup} />}
    </>
  );
};

export default BillBoard;
