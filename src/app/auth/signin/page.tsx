import { Button } from "@/components/ui";
import React, { useEffect } from "react";

const Index: React.FC = async () => {
    // const session = await auth();
    // // redirect to home if user is already logged in
    // if (session?.user) {
    //     redirect("/");
    // }
    return (
        <div>
            <p>Here, signIn page</p>
            <Button>Sign In</Button>
        </div>
    );
};

export default Index;
