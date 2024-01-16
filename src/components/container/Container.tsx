import React from "react";

import { DivProps } from "@/types";

export const Container: React.FC<DivProps> = (props) => {
    return (
        <div className={`container ${props.className}`}>{props.children}</div>
    );
};
