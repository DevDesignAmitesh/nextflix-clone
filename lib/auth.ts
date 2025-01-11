import { prisma } from "@/prisma/src";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import type { Adapter } from "next-auth/adapters";
import type { AuthOptions } from "next-auth";

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();

export const rateLimit = (
  userId: string,
  rateLimitCount: number,
  rateLimitInterval: number
): boolean => {
  const now = new Date();
  const userLimiter = userRateLimits.get(userId) ?? { timestamps: [] };

  userLimiter.timestamps = userLimiter.timestamps.filter(
    (timestamp) => now.getTime() - timestamp.getTime() < rateLimitInterval
  );

  if (userLimiter.timestamps.length >= rateLimitCount) {
    return false; // Rate limit exceeded
  }

  userLimiter.timestamps.push(now);
  userRateLimits.set(userId, userLimiter);
  return true;
};

export const auth: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password is required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("email does not exist");
        }

        const rateLimitCount = 5; // Max 5 login attempts
        const rateLimitInterval = 60000; // Per minute (60,000 ms)

        if (!rateLimit(credentials.email, rateLimitCount, rateLimitInterval)) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        const correctPassword = await compare(
          credentials.password,
          user.hashedPassword as string
        );

        if (!correctPassword) {
          throw new Error("wrong password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "production",
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session, token }: any) {
      await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
