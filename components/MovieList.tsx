import { allMovies } from "@/app/api/actions/allMovies";
import React from "react";
import { FaPlay } from "react-icons/fa";

const MovieList = async ({label}: {label: string}) => {
  const response = await allMovies();
  const movies = await response.json();
  const finalMovies = movies.allMovies;
  return (
    <div className="flex flex-col w-full gap-3 justify-center items-start">
      <h1 className="text-2xl font-semibold capitalize">{label}</h1>
      <div className="flex w-full justify-start items-center gap-3">
        {finalMovies.map((m: any) => (
          <div className="group relative w-[300px]">
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
                <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                  <FaPlay color="black" />
                </div>
                <p className="text-[14px] font-semibold text-green-600">
                  New{" "}
                  <span className="text-white">{new Date().getFullYear()}</span>
                </p>
                <p className="text-[12px]">{m.duration}</p>
                <p className="text-[12px] capitalize">{m.genre}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
