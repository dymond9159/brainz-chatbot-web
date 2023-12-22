import React from "react";
import { Button } from "../ui-components";
import { Flex } from "../default";

interface IProps {
    onPromptClick: (e: string) => void;
}
export const PromptSuggestionRow: React.FC<IProps> = ({ onPromptClick }) => {
    const prompts = [
        "I feel down-heart and blue",
        "I feel that life was meaningless",
        "I am troubled by attacks of nausea",
        "My hands and feet are usually warm",
        "I have a great deal of stomach trouble.",
    ];

    return (
        <Flex className="wrap justify-start items-center gap-10">
            {prompts.map((prompt, index) => (
                // <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={() => onPromptClick(prompt)} />
                <Button
                    key={index}
                    onClick={(e) => onPromptClick(prompt)}
                >
                    {prompt}
                </Button>
            ))}
        </Flex>
    );
};

export default PromptSuggestionRow;
