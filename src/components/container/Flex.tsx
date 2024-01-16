import React from "react";

import { DivProps } from "@/types";

export const Flex: React.FC<DivProps> = (props) => {
    return <div className={`flex ${props.className}`}>{props.children}</div>;
};
