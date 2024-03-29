import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Custom hook to get recipe data
export function useRecipe(id: string | undefined) {
  const { data, error, isLoading } = useSWR(`/recipe/${id}`, fetcher, {
    revalidateOnMount: true,
  });

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}
