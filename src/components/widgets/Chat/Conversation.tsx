import React, { forwardRef } from "react";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Flex } from "../../container";
import { IConversationProps, RecommendedOptionType } from "@/types/chat";
import { Button, ButtonGroup } from "@/components/ui";

export const Conversation: React.JSXElementConstructor<IConversationProps> =
    forwardRef(function bubble(convProps, ref) {
        return (
            <div
                id={`${convProps.content?.id}`}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`conversation ${convProps.content?.role}`}
            >
                <Flex className="items-start justify-end gap-10">
                    {/* {convProps.content.role === "assistant" && (
                        <BrainzAvatar
                            src=""
                            name="DY"
                            size="30"
                            color=""
                        />
                    )} */}
                    <div className={`message ${convProps.content?.role}`}>
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, children, ...props }) {
                                    let jsonData: RecommendedOptionType = {};
                                    let resultUI: React.ReactNode = <></>;

                                    if (
                                        props.className?.includes("json") &&
                                        convProps.last
                                    ) {
                                        try {
                                            jsonData = JSON.parse(
                                                children as string,
                                            );

                                            resultUI = (
                                                <code {...props}>
                                                    <ButtonGroup className="wrap gap-10">
                                                        {jsonData.options &&
                                                            jsonData.options.map(
                                                                (
                                                                    item,
                                                                    index,
                                                                ) => (
                                                                    <Button
                                                                        key={
                                                                            index
                                                                        }
                                                                        disabled={
                                                                            !convProps.last
                                                                        }
                                                                        onClick={() =>
                                                                            convProps.onAnswerClick(
                                                                                item as string,
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            item as string
                                                                        }
                                                                    </Button>
                                                                ),
                                                            )}
                                                    </ButtonGroup>
                                                </code>
                                            );
                                        } catch (ex) {}
                                    }
                                    return resultUI;
                                },
                                a: (props) => (
                                    <a href={props.href}> {props.children}</a>
                                ),
                            }}
                        >
                            {convProps.content?.content}
                        </Markdown>
                    </div>
                    {/* {convProps.content.role === "user" && (
                        <BrainzAvatar
                            className="user-avatar"
                            src=""
                            name="DY"
                            size="30"
                            color=""
                        />
                    )} */}
                </Flex>
            </div>
        );
    });

// const customeCodeUI = (
//     node,
//     children,
//     props
// ) => {
//     return <code {...props}>{props.children}</code>;
// };
