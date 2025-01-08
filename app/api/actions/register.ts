"use server";

import { prisma } from "@/prisma/src";
import { hash } from "bcrypt";

export async function register(name: string, email: string, password: string) {
  try {
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
