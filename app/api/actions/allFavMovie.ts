import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function allfavMovie(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "invalid email",
        },
        { status: 404 }
      );
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
