"use client";

import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";

const AuthLayout = (props: LayoutProps) => {
    return <div className={cn("authorized")}>{props.children}</div>;
};

export default AuthLayout;
