"use server";

import { prisma } from "@/prisma/src";

export async function oneMovie(movieId: any) {
  if (!movieId) {
    console.error("Invalid movieId provided:", movieId);
    return null;
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return movie;
  } catch (error) {
    if (!error) {
      console.log("Unknown error occurred.");
    } else {
      console.log("An error occurred:", error);
    }
    return;
  }
  
}
