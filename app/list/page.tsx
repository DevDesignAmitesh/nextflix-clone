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
        <div className=" w-full h-full pt-28 px-14">
          <MovieList
            email={userEmail}
            finalMovies={allFavMovies}
            label="My List"
          />
        </div>
      </div>
    </>
  );
};

export default page;
