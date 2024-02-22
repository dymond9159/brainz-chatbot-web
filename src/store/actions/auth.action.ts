"use server";

import { signIn, signOut } from "@/auth";
import routes from "@/utils/routes";

export const signin = async (provider: string) => {
    await signIn(provider, {
        redirect: true,
        redirectTo: routes.CHAT,
    });
};

export const signout = async () => {
    await signOut({ redirect: true, redirectTo: routes.INDEX });
};
