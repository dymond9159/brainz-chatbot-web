import NextAuth from "next-auth";

import { nextAuthConfig } from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth(nextAuthConfig);
