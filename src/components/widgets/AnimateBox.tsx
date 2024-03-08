import React, { Children } from "react";

import { cn } from "@/utils/functions";
import { IDivProps } from "@/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

interface IProps extends IDivProps {
    initial?: object;
    animate?: object;
    duration?: number;
}

export const AnimateBox: React.FC<IProps> = (props) => {
    return (
        <motion.div
            variants={{
                initial: {
                    // height: 0,
                    ...props.initial,
                },
                animate: {
                    // height: "auto",
                    ...props.animate,
                },
            }}
            initial={"initial"}
            animate={"animate"}
            transition={{
                duration: props.duration ?? 0.5,
                ease: "easeIn",
            }}
        >
            {props.children}
        </motion.div>
    );
};
