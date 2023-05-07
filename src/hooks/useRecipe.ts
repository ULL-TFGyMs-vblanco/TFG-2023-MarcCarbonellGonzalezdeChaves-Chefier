import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useRecipe(id: string | string[] | undefined) {
  const { data, error, isLoading } = useSWR(`/recipe/${id}`, fetcher, {
    shouldRetryOnError: false,
  });

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}
