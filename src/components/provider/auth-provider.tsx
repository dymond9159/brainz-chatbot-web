import { SessionProvider, SessionProviderProps } from "next-auth/react";
import type { Session } from "next-auth";

const AuthProvider = ({
    children,
    session,
}: React.PropsWithChildren<{ session: Session | null }>) => {
    console.log(session);
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
