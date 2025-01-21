import routes from '@/utils/routes';
import { useRouter } from 'next/navigation';

export default function AccessDenied() {
  const router = useRouter();
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href='/api/auth/signin'
          onClick={(e) => {
            e.preventDefault();
            router.push(routes.SIGNIN);
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  );
}
