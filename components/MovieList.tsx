"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import FavButton from "./FavButton";
import Link from "next/link";
import Popup from "./Popup"; // Import Popup component

const MovieList = ({ label, finalMovies, email }: { label: string; finalMovies: any; email: string; }) => {
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
          <h1 className="text-2xl font-semibold capitalize">{label}</h1>
          <div className="flex w-full justify-start items-center gap-3">
            {finalMovies.map((m: any) => (
              <div key={m.id} className="group relative w-[300px]">
                <img
                  className="h-[150px] w-full transition cursor-pointer shadow-xl group-hover:opacity-0 rounded-md delay-300 bg-no-repeat object-cover object-center"
                  src={m.thumbnailUrl}
                  alt="thumbnail"
                />
                <div className="absolute opacity-0 scale-0 group-hover:scale-110 group-hover:opacity-100 top-0 h-[350px] group-hover:-translate-y-[6vw] z-10 transition duration-200 visible delay-300 w-[300px] rounded-md bg-[#212124]">
                  <img
                    className="h-[50%] w-full shadow-xl rounded-md bg-no-repeat object-cover object-center"
                    src={m.thumbnailUrl}
                    alt="thumbnail"
                  />
                  <div className="w-full p-5 flex-col gap-4 flex justify-center items-start">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                        <Link href={`/watch/${m.id}`}>
                          <FaPlay size={20} color="black" />
                        </Link>
                      </div>
                      <FavButton email={email} movieId={m.id} />
                      {/* Info Button */}
                      <button
                        className="w-10 h-10 bg-white rounded-full flex justify-center items-center"
                        onClick={() => openPopup(m)} // Open popup for the clicked movie
                        aria-label="More Info"
                      >
                        <FiInfo size={20} color="black" />
                      </button>
                    </div>
                    <p className="text-[14px] font-semibold text-green-600">
                      New{" "}
                      <span className="text-white">
                        {new Date().getFullYear()}
                      </span>
                    </p>
                    <p className="text-[12px]">{m.duration}</p>
                    <p className="text-[12px] capitalize">{m.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show Popup when movie is clicked */}
      {popupMovie && <Popup email={email} movie={popupMovie} onClose={closePopup} />}
    </>
  );
};

export default MovieList;
