'use client';

import { SessionProvider, SessionProviderProps } from 'next-auth/react';

interface IAuthProviderProps extends SessionProviderProps {}

const AuthProvider = ({ session, ...rest }: IAuthProviderProps) => {
  return (
    <SessionProvider session={session} {...rest} refetchOnWindowFocus={true}>
      {rest.children}
    </SessionProvider>
  );
};

export default AuthProvider;
