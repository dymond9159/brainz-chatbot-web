"use client";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";
import routes from "@/utils/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UnAuthedLayout = (props: LayoutProps) => {
    const router = useRouter();
    const { status } = useSession();
    if (status === "authenticated") {
        return router.back();
    }
    return <div className={cn("unauthorized")}>{props.children}</div>;
};

export default UnAuthedLayout;
