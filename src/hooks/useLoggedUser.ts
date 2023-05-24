import { useSession } from 'next-auth/react';
import { useUser } from './useUser';

// Custom hook to get logged user
export function useLoggedUser() {
  const { data: session } = useSession();
  const { user, isLoading, isError, mutate } = useUser(
    'email',
    session?.user.email
  );
  return { user, isLoading, isError, mutate };
}
