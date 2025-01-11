import { prisma } from "@/prisma/src";

export async function allMovies() {
  try {
    const allMovies = await prisma.movie.findMany();
    return {
      allMovies
    }
  } catch (error) {
    console.log(error);
    return {
      error,
    }
  }
}
