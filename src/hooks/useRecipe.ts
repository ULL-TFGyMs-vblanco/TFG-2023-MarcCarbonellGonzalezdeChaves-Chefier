import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useRecipe(id: string, fallbackData: any) {
  const { data, error, isLoading } = useSWR(`/recipe/${id}`, fetcher, {
    fallbackData: fallbackData,
  });

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}
