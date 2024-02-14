"use client";

import { Metric } from "@/components/widgets";

interface IProps {
    params: {
        id: string;
    };
}

const MetricPage = (props: IProps) => {
    return <Metric metricId={props.params.id} />;
};

export default MetricPage;
