import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch(() => {
      throw new Error('An error occurred while fetching the data.');
    });

export function useRecipe(id: string) {
  const key = `/recipe/${id}`;
  const { data, error, isLoading } = useSWR(key, fetcher);

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}
