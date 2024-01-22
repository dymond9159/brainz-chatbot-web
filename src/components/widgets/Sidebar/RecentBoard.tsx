import React, { useState } from "react";
import { Button, ButtonGroup, Icon } from "../../ui";
import _utils from "@/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useTypedSelector } from "@/store";
import { removeRecentProgram } from "@/store/reducers";
import { cn } from "@/utils/functions";
import { IDivProps } from "@/types";

interface IProps extends IDivProps {
    progId?: string;
}

export const RecentBoard: React.FC<IProps> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { recentPrograms } = useTypedSelector((state) => state.chat);

    const handleToChat = (id: string) => {
        router.push(`/chat/${id}`);
    };

    const handleRemove = (id: string) => {
        dispatch(removeRecentProgram(id));
    };

    return (
        <ButtonGroup
            groupname="Recent Programs"
            className="recent-programs-scroll full col gap-10 justify-start items-start"
        >
            {recentPrograms &&
                recentPrograms.map((item, index) => (
                    <Button
                        className={cn(
                            item.progStrId === props.progId ? "current" : "",
                            ["full", "relative"],
                        )}
                        key={index}
                        onClick={() => handleToChat(item.progStrId)}
                    >
                        {_utils.functions.getProgram(item.progStrId).name}
                        <br></br>
                        <span className="last-message">{item.lastMessage}</span>
                        <div
                            className="remove"
                            onClick={() => handleRemove(item.progStrId)}
                        >
                            <Icon name="trash" />
                        </div>
                    </Button>
                ))}
        </ButtonGroup>
    );
};
