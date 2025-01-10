import { prisma } from "@/prisma/src";
import { NextResponse } from "next/server";

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
