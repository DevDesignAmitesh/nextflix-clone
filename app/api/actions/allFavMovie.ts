import { prisma } from "@/prisma/src";

export async function allfavMovie(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        message: "invalid email",
      }
    }

    const userFavMovie = await prisma.movie.findMany({
      where: {
        id: {
          in: user.favoriteIds,
        },
      },
    });

    return {
      userFavMovie
    }
  } catch (error) {
    console.log(error);
    return {
      error,
    }
  }
}
