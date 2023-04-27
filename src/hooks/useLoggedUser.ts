import { useSession } from 'next-auth/react';
import { useUser } from './useUser';

export function useLoggedUser() {
  const { data: session } = useSession();
  const { user, isLoading, isError } = useUser('email', session?.user.email);
  return { user, isLoading, isError };
}
