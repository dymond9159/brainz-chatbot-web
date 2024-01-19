import React from "react";
import { Button, ButtonGroup, Icon } from "../../ui";
import _utils from "@/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useTypedSelector } from "@/store";
import { removeRecentProgram } from "@/store/reducers";

export const RecentBoard: React.FC = (props) => {
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
            className="full col gap-10 justify-start items-start"
        >
            {recentPrograms &&
                recentPrograms.map((item, index) => (
                    <Button
                        className="full relative"
                        key={index}
                        onClick={() => handleToChat(item.progStrId)}
                    >
                        {_utils.functions.getProgram(item.progStrId).name}
                        <br></br>
                        <span className="last-message">{item.lastMessage}</span>
                        <Button
                            className="remove"
                            onClick={() => handleRemove(item.progStrId)}
                        >
                            <Icon name="trash"></Icon>
                        </Button>
                    </Button>
                ))}
        </ButtonGroup>
    );
};
