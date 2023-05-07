import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = async (url: string) =>
  await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
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
