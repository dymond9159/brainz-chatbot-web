import React, { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Line } from "rc-progress";
import swal from "sweetalert";

import { Box, Flex } from "@/components/container";
import { Button, ButtonGroup, Radio } from "@/components/ui";
import { BLANK_LINE } from "@/utils/constants";
import { AnswerOptionType, IDivProps, QuestionType } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/store";
import {
    clearMetricInfo,
    setActiveMetric,
    setActiveScore,
    setActiveStep,
} from "@/store/reducers";
import { motion } from "framer-motion";
import { AnimateBox } from "..";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

interface IProps extends IDivProps {
    q?: QuestionType;
    answerOptions?: AnswerOptionType[];
    questionCounts?: number;
    onStop?: () => void;
}
export const QuestionnaireWizard: React.FC<IProps> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, activeStep, goToStep, previousStep, nextStep } =
        useWizard();

    const [value, setValue] = useState<number>(-1);
    const [percent, setPercent] = useState<number>(0);

    const activeScore = useTypedSelector((state) => state.metric.activeScore);

    const lastPage = activeStep === (props.questionCounts ?? 0);

    useEffect(() => {
        if (activeScore) {
            setValue(activeScore[activeStep]);
        }
    }, [activeScore]);

    useEffect(() => {
        if (activeStep) {
            dispatch(setActiveStep(activeStep));
        }
    }, [activeStep]);

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
            swal({ title: "Please select a option at least.", icon: "info" });
            return;
        }

        nextStep();
    };

    const handleStop = () => {
        swal({
            title: "Would you like to pause or completely stop the survey?",
            text: "Once pause, you can continue the survey you are proceeding!",
            buttons: ["Pause", "Stop"],
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                if (props.onStop) props.onStop();
            } else {
                // continue
            }
        });
    };

    return (
        <Flex className={`col markdonw-box`}>
            {props.questionCounts && (
                <label className="counter">
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
            <AnimateBox
                duration={0.7}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Box className="scroll-box">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{}}
                    >
                        {`**${props.q?.question}**` +
                            BLANK_LINE +
                            `*${props.q?.description}*` +
                            BLANK_LINE +
                            `${props.q?.instruction}`}
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
                        {!lastPage ? "Next" : "Finish"}
                    </Button>
                    <Button
                        icon="arrow-clockwise"
                        onClick={() => goToStep(0)}
                    >
                        Restart
                    </Button>
                    <Button
                        icon="stop-fill"
                        onClick={handleStop}
                    >
                        Stop
                    </Button>
                </ButtonGroup>
            </AnimateBox>
        </Flex>
    );
};
