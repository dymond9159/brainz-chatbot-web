import React, { forwardRef } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Flex } from "../default";
import { IConversationProps } from "@/types/chat";

export const Conversation: React.JSXElementConstructor<IConversationProps> =
    forwardRef(function bubble(props, ref) {
        return (
            <div
                id={`${props.content.id}`}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`conversation ${props.content.role}`}
            >
                <Flex className="justify-end">
                    <div className={`message ${props.content.role}`}>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, children, ...props }) {
                                    return <code {...props}>{children}</code>;
                                },
                            }}
                        >
                            {props.content?.content}
                        </Markdown>
                    </div>
                </Flex>
            </div>
        );
    });
