import React, { Children } from "react";
import { IDivProps } from "@/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

interface IProps extends IDivProps {
    content?: string;
}

export const AnimateMarkdown: React.FC<IProps> = (props) => {
    return (
        <motion.div
            className="relative h-8"
            variants={{
                initial: {
                    height: 0,
                    opacity: 0,
                },
                animate: {
                    height: "auto",
                    opacity: 1,
                },
            }}
            initial={"initial"}
            animate={"animate"}
            transition={{
                duration: 1,
                ease: "easeIn",
            }}
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{}}
            >
                {props.content}
            </Markdown>
        </motion.div>
    );
};
