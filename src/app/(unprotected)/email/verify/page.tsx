"use client";

import { useRouter, useSearchParams } from "next/navigation";

import routes from "@/utils/routes";
import { VerifyOK, VerifyWrong } from "@/components/widgets/Auth";
import _utils from "@/utils";

const VerifyPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get("email");
    const token = params.get("token");

    let page = <VerifyWrong email={email ?? ""} />;

    if (email && token) {

        const decode = _utils.functions.jwtDecodeToken(token);
        if (decode?.email === email) {
            page = <VerifyOK />;
            router.push(`${routes.REGISTER}?email=${email}&verified=${token}`);
        }
    }

    return page;
};

export default VerifyPage;
