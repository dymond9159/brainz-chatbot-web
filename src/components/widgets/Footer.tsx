import React from "react";
import { Flex } from "../container";
import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <footer>
            <Flex className="row justify-between w-full">
                <span className="copyright">
                    © 2023-2024 Brainz Health. All rights reserved.
                </span>
            </Flex>
        </footer>
    );
};
