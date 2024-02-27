import React, { Suspense, cache, useEffect, useState } from "react";
import { Button, ButtonGroup, Icon } from "../../ui";
import _utils from "@/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch, useTypedSelector } from "@/store";
import { cn } from "@/utils/functions";
import { ChatType, IDivProps } from "@/types";
import { getChats } from "@/store/actions";
import { deleteChat } from "@/store/reducers";
import { useSidebar } from "@/hooks";

interface IProps extends IDivProps {
    chatId?: string;
}

export const RecentBoard: React.FC<IProps> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { toggleSidebar } = useSidebar();

    // const [chats, setChats] = useState<ChatType[]>();
    const chats = useTypedSelector((state) => state.chat.chats);

    useEffect(() => {
        // const loadChats = cache(async (userId?: string) => {
        //     setChats(await getChats(userId));
        // });
        // loadChats();
    }, []);

    const handleToChat = (id: string) => {
        toggleSidebar();
        router.push(`/chat/${id}`);
    };

    const handleRemove = (id: string) => {
        toggleSidebar();
        dispatch(deleteChat(id));
    };

    return (
        <ButtonGroup
            groupname="Recent Mindchats"
            className="recent-programs-scroll w-full col justify-start items-start"
        >
            <Suspense fallback={<div>Loading...</div>}>
                {chats &&
                    chats.map((item, index) => (
                        <Button
                            className={cn(
                                item.id === props.chatId ? "current" : "",
                                ["w-full", "relative", "last-message"],
                            )}
                            key={index}
                            onClick={() => handleToChat(item?.id ?? "")}
                        >
                            {item.lastMessage}
                            <div
                                className="remove"
                                onClick={() => handleRemove(item?.id ?? "")}
                            >
                                <Icon name="trash" />
                            </div>
                        </Button>
                    ))}
            </Suspense>
        </ButtonGroup>
    );
};
