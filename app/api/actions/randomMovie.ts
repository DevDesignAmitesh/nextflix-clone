"use server";

import { prisma } from "@/prisma/src";

export async function randomMovie() {
  try {
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return {
      randomMovie,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
}
