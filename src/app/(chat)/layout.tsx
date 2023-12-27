// import useSWR from "swr";

import { Navbar } from "@/components/widgets";
import { LayoutProps } from "@/types";
import { cn } from "@/utils/functions";

const AuthLayout = (props: LayoutProps) => {
    return (
        <div className={cn("authorized")}>
            <Navbar />
            {props.children}
        </div>
    );
};

export default AuthLayout;
