import { store } from "..";
import { MessageType, RecentProgramType } from "@/types";
import { setCurrentProgram } from "../reducers";
import _utils from "@/utils";

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

    store.dispatch(
        setCurrentProgram({
            data: _utils.functions.getProgram(progStrId),
            recentData: recentPrograms[findOne],
        }),
    );
};
