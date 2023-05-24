import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Custom hook to get data from a user
export function useUser(filter: 'email' | 'username', credential?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    credential ? `/${filter}/${credential}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}
