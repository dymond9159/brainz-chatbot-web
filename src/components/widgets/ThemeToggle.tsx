"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui";

export const ThemeToggle = () => {
    const { setTheme, theme } = useTheme();
    const [_, startTransition] = React.useTransition();

    return (
        <Button
            //   variant="ghost"
            icon={!theme ? undefined : theme === "dark" ? "sun" : "moon"}
            onClick={() => {
                startTransition(() => {
                    setTheme(theme === "light" ? "dark" : "light");
                });
            }}
        ></Button>
    );
};
