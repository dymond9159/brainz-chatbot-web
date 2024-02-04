import React, { Children } from "react";
import Avatar from "react-avatar";

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
            className="relative h-8"
            variants={{
                initial: {
                    height: 0,
                    ...props.initial,
                },
                animate: {
                    height: "auto",
                    ...props.animate,
                },
            }}
            initial={"initial"}
            animate={"animate"}
            transition={{
                duration: props.duration ?? 0.3,
                ease: "easeIn",
            }}
        >
            {props.children}
        </motion.div>
    );
};
