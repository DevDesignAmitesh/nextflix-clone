import MovieList from "@/components/MovieList";
import React from "react";
import { allfavMovie } from "../api/actions/allFavMovie";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";
import Navbar from "@/components/Navbar";

const page = async () => {
  const sesssion = await getServerSession(auth);
  const userEmail = sesssion?.user?.email as string;
  const userProfile = sesssion?.user?.image as string;
  const response: any = await allfavMovie(userEmail);
  const allFavMovies = response.userFavMovie;
  return (
    <>
      <div className="bg-[#171719] w-full min-h-screen text-white">
        <Navbar image={userProfile} />
        {allFavMovies.length !== 0 ? (
          <div className=" w-full h-screen pt-16 sm:pt-28 px-5 sm:px-14">
            <MovieList
              email={userEmail}
              finalMovies={allFavMovies}
              label="My List"
            />
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center text-2xl">
            No Favourite Movies
          </div>
        )}
      </div>
    </>
  );
};

export default page;
