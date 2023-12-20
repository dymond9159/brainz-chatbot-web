import { ChildrenProps } from "@/types";
import React from "react";

export const Sidebar: React.FC<ChildrenProps> = (props) => {
    return <div className={`sidebar ${props.className}`}>{props.children}</div>;
};
