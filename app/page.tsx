import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";
import { allMovies } from "./api/actions/allMovies";

const page = async () => {
  const sesssion = await getServerSession(auth);
  const userEmail = sesssion?.user?.email as string
  const userProfile = sesssion?.user?.image as string

  const res = await allMovies();
  const movies = res.allMovies;

  if (!sesssion) {
    redirect("/auth");
  }

  return (
    <>
      <div className="bg-[#171719] w-full h-auto text-white">
        <Navbar image={userProfile} />
        <BillBoard />
        <div className="w-full gap-8 flex flex-col p-14 justify-start items-center h-screen">
          <MovieList
            email={userEmail}
            finalMovies={movies}
            label="Trending Now"
          />
        </div>
      </div>
    </>
  );
};

export default page;
