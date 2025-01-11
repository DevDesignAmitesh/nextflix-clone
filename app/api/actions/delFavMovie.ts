"use server";

import { prisma } from "@/prisma/src";

export async function delFavMovie(movieId: string, email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return {
        message: "invalid email",
      };
    }

    const favMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!favMovie) {
      return {
        message: "invalid movieId",
      };
    }

    const updateFavMovieId = existingUser.favoriteIds.filter(
      (id) => id !== favMovie.id
    );

    const updateUser = await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        favoriteIds: {
          set: updateFavMovieId,
        },
      },
    });

    if (!updateUser) {
      return {
        message: "error adding fav movie",
      };
    }

    return {
      message: "successfully deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "error occured",
    };
  }
}
