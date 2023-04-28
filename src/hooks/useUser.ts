import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) =>
  axios.get(`${process.env.API_URL}${url}`).then((res) => res.data);

export function useUser(filter: 'email' | 'username', credential?: string) {
  const { data, error, isLoading } = useSWR(
    credential ? `/${filter}/${credential}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
