import NextAuth from "next-auth";

import { z } from "zod";

import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import authModule from "./modules/auth";

import type { NextAuthConfig, User } from "next-auth";
import { UserCreateParams } from "./types";
import jwtModule from "./modules/jwt.module";
import routes from "./utils/routes";
import { redirect } from "next/dist/server/api-utils";

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
    providers: [
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // Nodemailer({
        //     server: process.env.AUTH_EMAIL_SERVER,
        //     from: process.env.AUTH_EMAIL_FROM,
        // }),
        Credentials({
            name: "credentials",
            async authorize(credentials, request) {
                // Parsing and validating incoming credentials using Zod
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(1),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = credentials as UserCreateParams;

                    const user = await authModule.getUserByEmail(
                        email as string,
                    );

                    // If user exists, compare hashed passwords
                    if (!user) {
                        return {};
                    }

                    const passwordsMatch = await authModule.compare(
                        user.password ?? "NONE",
                        password ?? "",
                    );

                    // If passwords match, return the user
                    if (passwordsMatch) return user;
                } else {
                }

                // If credentials are invalid, log and return null
                return {};
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!user?.email) {
                return false;
            }
            if (account?.provider !== "credentials") {
                if (await authModule.isNewUser(user.email)) {
                    const userData: UserCreateParams = {
                        email: profile?.email ?? user.email ?? "",
                        name: profile?.nickname ?? profile?.name ?? "",
                        emailVerified: profile?.email_verified ?? false,
                        firstname: profile?.given_name ?? "",
                        lastname: profile?.family_name ?? "",
                        birthdate: profile?.birthdate ?? "",
                        phone: profile?.phone_number ?? "",
                        locale: profile?.locale ?? "",
                        address: profile?.address ?? undefined,
                        image: profile?.picture,
                        provider: account?.provider,
                    };

                    const response = await authModule.creatUser(userData);
                    if (response) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        },
        async authorized({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            return isLoggedIn;
        },
        async session({ session, token, trigger }) {
            return session;
        },
        async jwt({ token, user, account, profile, trigger }) {
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/register",
        verifyRequest: "/auth/verify",
        error: "/auth/signin",
    },
    // debug: true,
} satisfies NextAuthConfig;

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(nextAuthConfig);
