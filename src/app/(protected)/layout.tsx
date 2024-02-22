"use client";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const AuthedLayout = (props: LayoutProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "unauthenticated") {
        return router.push(routes.SIGNIN);
    }
    return <div className={cn(status)}>{props.children}</div>;
};

export default AuthedLayout;
