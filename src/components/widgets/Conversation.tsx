import React, { forwardRef } from "react";
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
                <Flex className="flex justify-end">
                    <div className={`message ${props.content.role}`}>
                        <p>{props.content.content}</p>
                    </div>
                </Flex>
            </div>
        );
    });
