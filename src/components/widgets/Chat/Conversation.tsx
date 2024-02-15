import React, { forwardRef } from "react";

import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "ai";

import { Flex } from "../../container";
import { RecommendedOptionType } from "@/types/chat";
import { Button, ButtonGroup } from "@/components/ui";
import { NONE } from "@/utils/constants";
import { useAppDispatch, useTypedSelector } from "@/store";
import { setMetricCallBackUrl } from "@/store/reducers";
import { IDivProps } from "@/types";

export interface IConversationProps {
    last: boolean;
    content: Message;
    ref: React.RefObject<HTMLDivElement>;
    chatId?: string;
    onAnswerClick: (answer: string) => void;
}

export const Conversation: React.JSXElementConstructor<IConversationProps> =
    forwardRef(function Bubble(convProps, ref) {
        const dispatch = useAppDispatch();
        if (convProps.content.id.includes(NONE)) {
            return null;
        }
        return (
            <div
                id={`${convProps.content?.id}`}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`conversation ${convProps.content?.role}`}
            >
                <Flex className="items-start justify-end gap-10">
                    <div className={`message ${convProps.content?.role}`}>
                        {convProps.content.role === "assistant" && (
                            <div className="brinze-chat"></div>
                        )}
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
                                a: (props) => CustomAnchorTag(props, convProps),
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

const CustomAnchorTag = (
    props: React.ClassAttributes<HTMLAnchorElement> &
        React.AnchorHTMLAttributes<HTMLAnchorElement> &
        ExtraProps,
    convProps: IConversationProps,
) => {
    const nextUrl = convProps.chatId ? `?next=../chat/${convProps.chatId}` : "";
    return (
        <a
            href={`${props.href}${nextUrl}`}
            style={{ fontWeight: "600", color: "#4040e1" }}
        >
            {props.children}
        </a>
    );
};
