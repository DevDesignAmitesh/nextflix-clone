"use server";

import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function addFavMovie(movieId: string, email: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "invalid email",
        },
        { status: 404 }
      );
    }

    const favMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!favMovie) {
      return NextResponse.json(
        {
          message: "invalid movieId",
        },
        { status: 404 }
      );
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
      return NextResponse.json(
        {
          message: "error adding fav movie",
        },
        { status: 404 }
      );
    }

    return { message: "added to fav" };
  } catch (error) {
    console.log(error);
    return { error: "error occured" };
  }
}
