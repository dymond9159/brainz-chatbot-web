import React from "react";

import { IDivProps } from "@/types";

export const Flex: React.FC<IDivProps> = (props) => {
    return <div className={`flex ${props.className}`}>{props.children}</div>;
};
