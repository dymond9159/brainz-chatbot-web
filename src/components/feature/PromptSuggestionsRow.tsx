import React from "react";
import { Button } from "../ui-components";
import { Flex } from "../default";

interface IProps {
    onPromptClick: (e: string) => void;
    suggestAnswers?: string[];
}

const PROMPTS = [
    "I feel down-heart and blue",
    "I feel that life was meaningless",
    "I am troubled by attacks of nausea",
    "My hands and feet are usually warm",
];

export const PromptSuggestionRow: React.FC<IProps> = ({
    onPromptClick,
    suggestAnswers = PROMPTS,
}) => {
    return (
        <Flex className="wrap justify-start items-center gap-10">
            {suggestAnswers.map((answer, index) => (
                // <PromptSuggestionButton key={`suggestion-${index}`} text={prompt} onClick={() => onPromptClick(prompt)} />
                <Button
                    key={index}
                    onClick={(e) => onPromptClick(answer)}
                >
                    {answer}
                </Button>
            ))}
        </Flex>
    );
};

export default PromptSuggestionRow;
