import { store } from "..";
import { MessageType, RecentProgramType } from "@/types";
import { updateInitMessages } from "../reducers";

/**
 *  Switch program - message history
 */
export const switchProgram = (progStrId: string) => {
    // get messages with progStrId from recent programs.
    const recentPrograms = store.getState().chat
        .recentPrograms as RecentProgramType[];

    const findOne = recentPrograms.findLastIndex(
        (item) => item.progStrId === progStrId,
    );
    let initMessages: MessageType[] = [];
    if (findOne !== -1) {
        initMessages = recentPrograms[findOne]?.messages ?? [];
    }

    // set initMessages
    store.dispatch(updateInitMessages(initMessages));
};
