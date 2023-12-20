import React, { FC, useMemo } from "react";

import * as icons from "@/_assets/icons";
import { IconType } from "@/types";

interface Props extends IconType {
    name: string;
}

export type IconListType = {
    [key: string]: React.FC;
};

export const iconList = (): IconListType => {
    const obj: IconListType = {};
    Object.entries(icons).forEach(([key, value]) => {
        const index = key
            .replace(/Icon$/g, "")
            .match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g)
            ?.join("-")
            .toLocaleLowerCase();

        if (index !== undefined) {
            obj[index] = value;
        }
    });
    return obj;
};

export const Icon: FC<Props> = (props) => {
    const { name, color = "currentColor", size = "1em", ...rest } = props;

    const list = useMemo(() => {
        return iconList();
    }, []);

    const component = useMemo(() => {
        return list[name];
    }, [name]);

    return component ? React.createElement(component, { ...rest }) : <></>;
};
