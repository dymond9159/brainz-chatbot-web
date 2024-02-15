"use client";

import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import { motion, AnimatePresence } from "framer-motion";

import { Flex, Container, Content, Wrapper, Box } from "@/components/container";
import {
    Navbar,
    QuestionnaireWizard,
    ReportWizard,
    Sidebar,
    WelcomeWizard,
} from "@/components/widgets";
import _utils from "@/utils";
import { ANSWER_COLLECT } from "@/libs/questionnaires/answers/answer";
import { useAppDispatch, useTypedSelector } from "@/store";
import { clearMetricInfo, setActiveMetric } from "@/store/reducers";
import { useRouter, useSearchParams } from "next/navigation";
import routes from "@/utils/routes";
import { ProgramDataType } from "@/types";

export interface MetricPageProps {
    metricId?: string;
}

export const Metric: React.FC<MetricPageProps> = (props) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [tool, setTool] = useState<ProgramDataType>();

    const params = useSearchParams();

    const callBackUrl = params.get("next");

    useEffect(() => {
        const _tool = _utils.functions.getMetric(props.metricId);
        setTool(_tool);
        dispatch(setActiveMetric(props.metricId));
    }, [props.metricId]);

    const handleStop = () => {
        if (callBackUrl) {
            router.push(callBackUrl);
        } else {
            router.push(routes.EXPLORE);
        }
    };

    return (
        <Container className="main-container">
            <Flex>
                <Sidebar className="left-side" />
                <Flex className="main-section col">
                    <Navbar className="main-nav"></Navbar>
                    <Content className="test-content">
                        <Wrapper>
                            <Content className="test-area">
                                <Wizard
                                    startIndex={0}
                                    // wrapper={<AnimateWrapper />}
                                >
                                    <WelcomeWizard
                                        intro={tool?.questionnaires?.introduce}
                                        metricName={tool?.strid}
                                        onStop={handleStop}
                                    />
                                    {tool?.questionnaires?.questions.length &&
                                        tool.questionnaires.questions.map(
                                            (q, i) => (
                                                <QuestionnaireWizard
                                                    key={i}
                                                    q={q}
                                                    questionCounts={
                                                        tool.questionnaires
                                                            ?.questionCounts
                                                    }
                                                    answerOptions={
                                                        ANSWER_COLLECT[
                                                            q.answerType
                                                        ]
                                                    }
                                                    onStop={handleStop}
                                                />
                                            ),
                                        )}
                                    <ReportWizard
                                        report={tool?.questionnaires?.report}
                                        qCount={
                                            tool?.questionnaires?.questionCounts
                                        }
                                        maxScore={
                                            tool?.questionnaires?.maxScore
                                        }
                                        onStop={handleStop}
                                    />
                                </Wizard>
                            </Content>
                        </Wrapper>
                    </Content>
                </Flex>
            </Flex>
        </Container>
    );
};
