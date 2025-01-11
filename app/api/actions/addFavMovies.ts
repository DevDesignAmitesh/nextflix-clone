"use server";

import { prisma } from "@/prisma/src";

export async function addFavMovie(movieId: string, email: string) {
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

    const updateUser = await prisma.user.update({
      where: {
        email: existingUser.email,
      },
      data: {
        favoriteIds: {
          push: favMovie.id,
        },
      },
    });

    if (!updateUser) {
      return {
        message: "error adding fav movie",
      };
    }

    return { message: "added to fav" };
  } catch (error) {
    console.log(error);
    return { error: "error occured" };
  }
}
