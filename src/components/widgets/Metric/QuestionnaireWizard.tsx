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
import { clearMetricInfo, setActiveScore } from "@/store/reducers";
import { AnimateBox } from "..";
import { useRouter } from "next/navigation";
import { ANSWER_COLLECT } from "@/libs/questionnaires/answers/answer";

interface IProps extends IDivProps {
    q?: QuestionType;
    answerOptions?: AnswerOptionType[];
    questionCounts?: number;
    onStop?: () => void;
}
export const QuestionnaireWizard: React.FC<IProps> = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { activeStep, goToStep, previousStep, nextStep } = useWizard();

    const [value, setValue] = useState<number>(-1); // your state in number
    const [finalValue, setFinalValue] = useState<number>(-1); // your state in number
    const [percent, setPercent] = useState<number>(0); // proceed percent
    const [isFollow, setIsFollow] = useState<boolean>(false);

    // able to continue the test based on the activeStep in store
    const activeMetric = useTypedSelector((state) => state.metric.activeMetric);
    const activeScore = useTypedSelector(
        (state) => state.metric.scores[activeMetric ?? ""]?.itemsScore,
    );
    const prevStep = useTypedSelector(
        (state) => state.metric.scores[activeMetric ?? ""]?.prevStep,
    );

    // when lasted tab, use "Finish >" button instead "Next >"
    const lastPage = activeStep === (props.questionCounts ?? 0);
    const followAnswers =
        ANSWER_COLLECT[props.q?.follow_question?.answerType ?? ""] ?? [];

    useEffect(() => {
        if (activeScore && activeStep) {
            setValue(activeScore[activeStep]);
        }
    }, [activeScore, activeStep]);

    useEffect(() => {
        const _percent = (activeStep / (props.questionCounts ?? 1)) * 100;
        setPercent(_percent);
    }, [activeStep, props.questionCounts]);

    // when change the your experience value.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = Number.parseInt(e.target.value);
        if (activeMetric === "suicidal") {
            if (activeStep === 6 && _value === 1) {
                setIsFollow(true);
            } else {
                setIsFollow(false);
            }
        }
        if (_value >= 0) setValue(_value);
    };

    const handleChangeFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = Number.parseInt(e.target.value);
        setFinalValue(_value);
    };

    // Move to Next Question
    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const _value = finalValue !== -1 ? finalValue : value;

        if (_value === -1) {
            swal({ title: "Please select a option at least.", icon: "info" });
            return;
        }
        if (activeStep && _value !== -1) {
            let _nextStep = !lastPage ? activeStep + 1 : 0; // default

            if (activeMetric === "suicidal") {
                if (activeStep === 2 && _value === 0) {
                    _nextStep = 6;
                    goToStep(6);
                } else {
                    nextStep();
                }
            } else {
                nextStep();
            }

            dispatch(
                setActiveScore({
                    scoreIndex: activeStep,
                    score: _value,
                    activeStep: _nextStep,
                    prevStep: activeStep,
                }),
            );
        }
    };

    // Restart the test
    const handleRestart = () => {
        swal({
            title: "Are you sure?",
            text: "Once restart, you will reset metric data from start.",
            buttons: ["Not Sure", true],
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                dispatch(clearMetricInfo());
                goToStep(0);
            }
        });
    };

    const handleBack = () => {
        console.log(prevStep, activeStep);
        goToStep(prevStep[activeStep]);
    };

    const handleStop = () => {
        swal({
            title: "Would you like to pause or completely stop the survey?",
            text: "Once pause, you can continue the survey you are proceeding!",
            buttons: ["Pause", "Stop"],
            dangerMode: true,
        }).then((ok) => {
            if (ok) {
                dispatch(clearMetricInfo());
            } else {
                // continue
            }
            if (props.onStop) props.onStop();
        });
    };

    return (
        <Flex className={`col markdonw-box`}>
            {props.questionCounts && (
                <label className="counter">
                    <strong>{activeStep}</strong>/{props.questionCounts}
                </label>
            )}
            <Line
                className="progress-bar"
                percent={percent}
                strokeWidth={3}
                strokeColor="#AAD3D3"
            />
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
                    {isFollow && (
                        <React.Fragment>
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{}}
                            >
                                {`**${
                                    props.q?.follow_question?.question ?? ""
                                }**`}
                            </Markdown>
                            <ButtonGroup className="col justify-start items-start pl-20">
                                {followAnswers &&
                                    followAnswers.map((item, i) => (
                                        <Radio
                                            key={i}
                                            checked={finalValue === item.value}
                                            name="follow-option"
                                            title={item.strValue}
                                            value={item.value}
                                            onChange={handleChangeFinal}
                                        />
                                    ))}
                            </ButtonGroup>
                        </React.Fragment>
                    )}
                </Box>
                <hr />
                <ButtonGroup className="wrap gap-15">
                    {activeStep !== 1 && (
                        <Button
                            icon="caret-open-left"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        supicon={true}
                        icon="caret-open-right"
                        onClick={handleNext}
                    >
                        {!lastPage ? "Next" : "Finish"}
                    </Button>
                    <Button
                        icon="arrow-clockwise"
                        onClick={handleRestart}
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
