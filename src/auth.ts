import NextAuth from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";

import type { NextAuthConfig, User } from "next-auth";

// declare module "next-auth" {
//     interface Session {
//         user: {
//             picture?: string;
//         } & Omit<User, "id">;
//     }
// }

export const nextAuthConfig = {
    theme: {
        logo: "/public/logo.png",
    },
    trustHost: true,
    // adapter: PrismaAdapter(prisma),
    providers: [
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // Email,
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            return isLoggedIn;
        },
        async session({ session }) {
            console.log(session);
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
} satisfies NextAuthConfig;

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(nextAuthConfig);
