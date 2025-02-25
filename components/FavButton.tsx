"use client";

import { addFavMovie } from "@/app/api/actions/addFavMovies";
import { checkFavMovie } from "@/app/api/actions/checkFavMovie";
import { delFavMovie } from "@/app/api/actions/delFavMovie";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";

type FavButtonProps = {
  email: string;
  movieId: any;
};

const FavButton = ({ email, movieId }: FavButtonProps) => {
  const [isFav, setIsFav] = useState<boolean | null>();
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res: any = await checkFavMovie(movieId, email);
        const isFavMovie = res.isFavMovie;
        setIsFav(isFavMovie);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    checkFavorite(); // Execute the async function
  }, [email, movieId, isFav, setIsFav]);

  const handleAddMovie = async () => {
    try {
      setIsFav(true); // Set to true when movie is added to favorites
      await addFavMovie(movieId, email);
    } catch (error) {
      console.log(error);
      setIsFav(false); // Handle error by setting isFav to false
    }
  };

  const handledelMovie = async () => {
    try {
      setIsFav(false); // Set to false when movie is removed from favorites
      await delFavMovie(movieId, email);
    } catch (error) {
      console.log(error);
      setIsFav(true); // Handle error by keeping isFav true
    }
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 cursor-pointer hover:opacity-60 bg-black rounded-full flex justify-center items-center transition duration-200">
      {isFav ? (
        <IoMdCheckmark
          onClick={handledelMovie}
          className="text-xl sm:text-2xl md:text-3xl"
          color="white"
        />
      ) : (
        <GoPlus
          onClick={handleAddMovie}
          className="text-xl sm:text-2xl md:text-3xl"
          color="white"
        />
      )}
    </div>
  );
};

export default FavButton;
