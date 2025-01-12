import React from "react";
import { oneMovie } from "@/app/api/actions/oneMovie";
import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// Adjust the way you handle params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params; // Await `params`
  const movie = await oneMovie(movieId);

  if (!movie) {
    return {
      title: "Movie not found",
    };
  }

  return {
    title: `${movie.title} - Watch Now`,
    description: movie.description || "Watch this amazing movie!",
  };
}

const WatchMovie = async ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = await params; // Await `params` to fix the error
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
      <nav className="w-full p-5 gap-4 sm:gap-10 text-white flex justify-start items-center">
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
        className="w-full h-[56.25vw] sm:h-[36.25vw]"
        src={movie.videoUrl}
      />
    </div>
  );
};

export default WatchMovie;
