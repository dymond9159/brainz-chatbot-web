import React from "react";

import { DivProps } from "@/types";

export const Section: React.FC<DivProps> = (props) => {
    return <div className={`section ${props.className}`}>{props.children}</div>;
};
