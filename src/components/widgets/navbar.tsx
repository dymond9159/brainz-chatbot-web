import React from "react";
import { Content } from "../default";
import { ChildrenProps } from "@/types";

export const Navbar: React.FC<ChildrenProps> = (props) => {
    return (
        <Content className={`header ${props.className}`}>
            {props.children}
        </Content>
    );
};
