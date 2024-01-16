import React from "react";

import { DivProps } from "@/types";

export const Content: React.FC<DivProps> = (props) => {
    return <div className={`content ${props.className}`}>{props.children}</div>;
};
