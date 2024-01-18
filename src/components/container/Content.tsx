import React from "react";

import { IDivProps } from "@/types";

export const Content: React.FC<IDivProps> = (props) => {
    return <div className={`content ${props.className}`}>{props.children}</div>;
};
