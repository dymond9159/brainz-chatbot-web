import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// import Apple from "next-auth/providers/apple"
// import Auth0 from "next-auth/providers/auth0"
// import Discord from "next-auth/providers/discord"
import Facebook from "next-auth/providers/facebook";
// import GitHub from "next-auth/providers/github";
// import Email from "next-auth/providers/nodemailer";
// import Gitlab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google";
// import Instagram from "next-auth/providers/instagram"
// import LinkedIn from "next-auth/providers/linkedin"
// import Twitter from "next-auth/providers/twitter"
// import Zoho from "next-auth/providers/zoho"

import type { NextAuthConfig } from "next-auth";

export const nextAuthConfig = {
    theme: {
        logo: "/public/logo.png",
    },
    // trustHost: true,
    // adapter: PrismaAdapter(prisma),
    providers: [
        // Apple,
        // Auth0,
        // Discord,
        Facebook,
        Google,
        // Email,
        // GitHub,
        // Instagram,
        // LinkedIn,
        // Twitter,
        // Zoho,
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async authorized({ auth, request }) {
            console.log(">>>>>>", request.nextUrl);
            const isLoggedIn = !!auth?.user;
            return isLoggedIn;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
} satisfies NextAuthConfig;
