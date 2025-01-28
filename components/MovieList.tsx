"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import FavButton from "./FavButton";
import Link from "next/link";
import Popup from "./Popup";

const MovieList = ({
  label,
  finalMovies,
  email,
}: {
  label: string;
  finalMovies: any;
  email: string;
}) => {
  const [popupMovie, setPopupMovie] = useState<any | null>(null); // Track which movie's popup to show

  const openPopup = (movie: any) => {
    setPopupMovie(movie); // Open the popup for the clicked movie
  };

  const closePopup = () => {
    setPopupMovie(null); // Close the popup
  };

  return (
    <>
      {finalMovies.length !== 0 && (
        <div className="flex flex-col w-full gap-3 justify-center items-start">
          <h1 className="sm:text-2xl text-xl font-semibold capitalize">
            {label}
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {finalMovies.map((m: any) => (
              <div
                key={m.id}
                className="group relative h-[40vw] sm:h-[30vw] md:h-[20vw] lg:h-[16vw] xl:h-[12vw]"
              >
                {/* Movie Thumbnail */}
                <img
                  className="h-full w-full transition cursor-pointer shadow-xl group-hover:opacity-0 rounded-md delay-300 bg-no-repeat object-cover object-center"
                  src={m.thumbnailUrl}
                  alt="thumbnail"
                />
                {/* Hover Details */}
                <div className="absolute opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-100 top-0 h-auto w-full z-10 transition duration-200 visible delay-300 rounded-md bg-[#212124] p-2 sm:p-4">
                  {/* Hover Thumbnail */}
                  <img
                    className="h-[50%] w-full shadow-xl rounded-md bg-no-repeat object-cover object-center"
                    src={m.thumbnailUrl}
                    alt="thumbnail"
                  />
                  <div className="flex flex-col pt-2 gap-2">
                    {/* Play & Info Buttons */}
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        className="p-2 sm:p-3 bg-black rounded-full flex justify-center items-center"
                        href={`/watch/${m.id}`}
                      >
                        <FaPlay className="text-xs sm:text-sm" color="white" />
                      </Link>
                      <FavButton email={email} movieId={m.id} />
                      <button
                        className="p-2 sm:p-3 bg-black rounded-full flex justify-center items-center"
                        onClick={() => openPopup(m)}
                        aria-label="More Info"
                      >
                        <FiInfo className="text-sm sm:text-lg" color="white" />
                      </button>
                    </div>
                    {/* Movie Details */}
                    <p className="text-[10px] sm:text-[12px] font-semibold text-green-600">
                      New{" "}
                      <span className="text-white">
                        {new Date().getFullYear()}
                      </span>
                    </p>
                    <p className="text-[9px] sm:text-[12px]">{m.duration}</p>
                    <p className="text-[9px] sm:text-[12px] capitalize">
                      {m.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {popupMovie && (
        <Popup email={email} movie={popupMovie} onClose={closePopup} />
      )}
    </>
  );
};

export default MovieList;
