"use server";

import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

export async function randomMovie() {
  try {
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(
      {
        randomMovie,
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
