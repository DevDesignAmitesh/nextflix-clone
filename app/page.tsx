import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import BillBoard from "@/components/BillBoard";
import MovieList from "@/components/MovieList";

const page = async () => {
  const sesssion = await getServerSession(auth);

  if (!sesssion) {
    redirect("/auth");
  }
  return (
    <>
      <div className="bg-[#171719] w-full h-auto text-white">
        <Navbar image={sesssion.user?.image || ""} />
        <BillBoard />
        <div className="w-full gap-8 flex flex-col p-14 justify-start items-center h-screen">
          <MovieList label="Trending Now" />
          <MovieList label="Latest" />
        </div>
      </div>
    </>
  );
};

export default page;
