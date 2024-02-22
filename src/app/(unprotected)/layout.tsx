"use client";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";
import routes from "@/utils/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UnAuthedLayout = (props: LayoutProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "authenticated") {
        return router.push(routes.CHAT);
    }
    return <div className={cn("unauthorized")}>{props.children}</div>;
};

export default UnAuthedLayout;
