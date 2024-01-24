"use client";

import React, { useEffect } from "react";

const Index: React.FC = () => {
    useEffect(() => {
        console.log("[]");
    }, []);
    return (
        <div>
            <p>Here, signIn page</p>
        </div>
    );
};

export default Index;
