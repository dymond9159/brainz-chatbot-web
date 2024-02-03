import React, { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Line } from "rc-progress";

import { Box, Flex } from "@/components/container";
import { Button, ButtonGroup, Radio } from "@/components/ui";
import { BLANK_LINE } from "@/utils/constants";
import { AnswerOptionType, IDivProps, QuestionType } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/store";
import { setActiveScore, setActiveStep } from "@/store/reducers";

interface IProps extends IDivProps {
    q?: QuestionType;
    answerOptions?: AnswerOptionType[];
    questionCounts?: number;
}
export const QuestionnaireWizard: React.FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const {
        isLoading,
        activeStep,
        goToStep,
        handleStep,
        previousStep,
        nextStep,
    } = useWizard();

    const [value, setValue] = useState<number>(-1);
    const [percent, setPercent] = useState<number>(0);

    const activeScore = useTypedSelector((state) => state.metric.activeScore);

    useEffect(() => {
        if (activeStep && activeScore) {
            setValue(activeScore[activeStep]);
            dispatch(setActiveStep(activeStep));
        }
    }, [activeStep, activeScore]);

    useEffect(() => {
        const _percent = (activeStep / (props.questionCounts ?? 1)) * 100;
        setPercent(_percent);
    }, [activeStep]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = Number.parseInt(e.target.value);
        if (activeStep && _value !== -1) {
            dispatch(setActiveScore({ scoreIndex: activeStep, score: _value }));
        }
        setValue(_value);
    };

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (value === -1) {
            alert("Please select a option at least.");
            return;
        }

        nextStep();
    };

    return (
        <React.Fragment>
            <Flex className={`col border markdonw-box`}>
                {props.questionCounts && (
                    <label>
                        <strong>{activeStep}</strong>/{props.questionCounts}
                    </label>
                )}
                <br />
                <Line
                    percent={percent}
                    strokeWidth={3}
                    strokeColor="#AAD3D3"
                />
                <br />
                <br />
                <Box className="scroll-box">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{}}
                    >
                        {`**${props.q?.question}**` +
                            BLANK_LINE +
                            props.q?.description +
                            BLANK_LINE +
                            props.q?.instruction}
                    </Markdown>
                    <ButtonGroup className="col justify-start items-start pl-20">
                        {props.answerOptions &&
                            props.answerOptions.map((item, i) => (
                                <Radio
                                    key={i}
                                    checked={value === item.value}
                                    name="option"
                                    title={item.strValue}
                                    value={item.value}
                                    onChange={handleChange}
                                />
                            ))}
                    </ButtonGroup>
                </Box>
                <hr />
                <ButtonGroup className="wrap gap-15">
                    <Button
                        icon="caret-open-left"
                        onClick={() => previousStep()}
                    >
                        Back
                    </Button>
                    <Button
                        supicon
                        icon="caret-open-right"
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                    <Button
                        icon="arrow-clockwise"
                        onClick={() => goToStep(0)}
                    >
                        Reset
                    </Button>
                    <Button icon="stop-fill">Stop</Button>
                </ButtonGroup>
            </Flex>
        </React.Fragment>
    );
};
