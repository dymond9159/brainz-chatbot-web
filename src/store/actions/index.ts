import NextAuth, { type DefaultSession } from "next-auth";

// Sign in
// email(or username), password

type UserAuthenticationType = {
    username?: string;
    email?: string;
    password: string;
};

export const signIn = async (payload: UserAuthenticationType) => {};
