import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function allMovies() {
  try {
    const allMovies = await prisma.movie.findMany();
    return NextResponse.json(
      {
        allMovies,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
      },
      { status: 400 }
    );
  }
}
