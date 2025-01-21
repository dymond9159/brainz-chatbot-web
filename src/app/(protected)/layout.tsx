'use client';

import { LayoutProps } from '@/types';
import { cn } from '@/utils/functions';
import routes from '@/utils/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthedLayout = (props: LayoutProps) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'unauthenticated') {
    return router.push(routes.SIGNIN);
  }
  return <div className={cn('authorized')}>{props.children}</div>;
};

export default AuthedLayout;
