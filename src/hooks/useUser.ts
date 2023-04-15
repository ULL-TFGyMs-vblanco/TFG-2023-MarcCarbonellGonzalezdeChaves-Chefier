import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useUser(username?: string) {
  const { data, error, isLoading } = useSWR(
    username ? `/users/${username.toLowerCase().replace(/ /g, '_')}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
