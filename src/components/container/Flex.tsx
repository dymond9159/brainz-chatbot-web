import React from "react";

import { ChildrenProps } from "@/types";

export const Flex: React.FC<ChildrenProps> = (props) => {
    return <div className={`flex ${props.className}`}>{props.children}</div>;
};
