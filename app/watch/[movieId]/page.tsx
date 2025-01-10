import React from "react";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { oneMovie } from "@/app/api/actions/oneMovie";

interface MovieProps {
  params: { movieId: string };
}

const WatchMovie = async ({ params }: MovieProps) => {
  const { movieId } = params;

  // Fetch movie data
  const movie = await oneMovie(movieId);

  if (!movie) {
    return (
      <div className="w-full min-h-screen bg-black text-white flex justify-center items-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <nav className="w-full p-5 gap-10 text-white flex justify-start items-center">
        <Link href={"/"}>
          <MdOutlineKeyboardBackspace size={30} />
        </Link>
        <p className="flex justify-center gap-2 items-center">
          <span className="text-4xl font-bold">{movie.title}</span>
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="w-full h-[36.25vw]"
        src={movie.videoUrl}
      />
    </div>
  );
};

export default WatchMovie;
