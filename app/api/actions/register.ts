"use server";

import { rateLimit } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { hash } from "bcrypt";

export async function register(name: string, email: string, password: string) {
  try {
    const rateLimitCount = 5; // Max 5 registration attempts
    const rateLimitInterval = 60000; // Per minute (60,000 ms)

    if (!rateLimit(email, rateLimitCount, rateLimitInterval)) {
      throw new Error(
        "Too many registration attempts. Please try again later."
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("user already exists");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}
