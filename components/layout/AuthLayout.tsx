import { DEVICE_ID, USER_ID } from "@/constants/auth";
import { resetSignUpRequest } from "@/redux";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies([DEVICE_ID, USER_ID]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (
            router &&
            !router.asPath.includes("login") &&
            !router.asPath.includes("forgot-password") &&
            !router.asPath.includes("sign-up")
        ) {
            if (!cookies.deviceId && !cookies.userId) {
                router.push("/login");
            }
        }
        if (
            (router && router.asPath.includes("login")) ||
            router.asPath.includes("forgot-password") ||
            router.asPath.includes("sign-up")
        ) {
            if (cookies.deviceId && cookies.userId) {
                router.push("/");
            }
            dispatch(resetSignUpRequest());
        }
    }, [router, cookies]);

    return <>{children}</>;
};