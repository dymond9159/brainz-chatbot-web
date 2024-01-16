import React, { forwardRef } from "react";

import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";

import { Flex } from "../container";
import { IConversationProps } from "@/types/chat";

export const Conversation: React.JSXElementConstructor<IConversationProps> =
    forwardRef(function bubble(convProps, ref) {
        return (
            <div
                id={`${convProps.content.id}`}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`conversation ${convProps.content.role}`}
            >
                <Flex className="justify-end">
                    <div className={`message ${convProps.content.role}`}>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, children, ...props }) {
                                    return <code {...props}>{children}</code>;
                                },
                                a: (props) => (
                                    <a href={props.href}> {props.children}</a>
                                ),
                                ul: (props) => customizeUl(props),
                                ol: (props) => customizeUl(props),
                                li: (props) => (
                                    <button
                                        key={props.itemID}
                                        onClick={() => {
                                            convProps.onAnswerClick(
                                                props.children?.valueOf() as string,
                                            );
                                        }}
                                    >
                                        {props.children}
                                    </button>
                                ),
                            }}
                        >
                            {convProps.content?.content}
                        </Markdown>
                    </div>
                </Flex>
            </div>
        );
    });

const customizeUl = (
    props: React.ClassAttributes<HTMLUListElement> &
        React.HTMLAttributes<HTMLUListElement> &
        ExtraProps,
) => {
    return <Flex className="wrap full gap-5">{props.children}</Flex>;
};
