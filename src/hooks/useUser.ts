import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useUser(
  filter: 'email' | 'username',
  credential?: string
) {
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
