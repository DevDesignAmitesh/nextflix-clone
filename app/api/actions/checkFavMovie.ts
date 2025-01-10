"use server";

import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function checkFavMovie(movieId: string, email: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "invalid email" }, { status: 404 });
  }

  const isFavMovie = existingUser.favoriteIds.includes(movieId);

  return { isFavMovie }
}
