"use client";

import React from "react";

import { Section } from "@/components/container";
import { AnimateBox } from "@/components/widgets";
import { Button } from "@/components/ui";
import { useWizard } from "react-use-wizard";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

export const StepB: React.FC = () => {
    const router = useRouter();
    return (
        <AnimateBox
            duration={3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Section className="flex col justify-center items-center">
                <h2>{`Unlock your mental health journey with Brainz Health!`}</h2>
                <br />
                <br />
                <br />
                <br />
                <Button
                    className="ghost black"
                    style={{ width: "150px" }}
                    onClick={() => router.push(routes.CHAT)}
                >
                    START
                </Button>
            </Section>
        </AnimateBox>
    );
};
