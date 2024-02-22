import { SessionProvider, SessionProviderProps } from "next-auth/react";
const AuthProvider = (props: SessionProviderProps) => {
    const { session, children } = props;
    return (
        <SessionProvider
            session={session}
            refetchOnWindowFocus={true}
        >
            {children}
        </SessionProvider>
    );
};

export default AuthProvider;
