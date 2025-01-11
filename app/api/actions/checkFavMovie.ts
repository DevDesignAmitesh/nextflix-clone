"use server";

import { prisma } from "@/prisma/src";

export async function checkFavMovie(movieId: string, email: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return { message: "invalid email" };
  }

  const isFavMovie = existingUser.favoriteIds.includes(movieId);

  return { isFavMovie };
}
