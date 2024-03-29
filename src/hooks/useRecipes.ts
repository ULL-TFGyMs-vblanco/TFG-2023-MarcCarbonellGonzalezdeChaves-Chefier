import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Custom hook to get recipe list
export function useRecipes(pageIndex: number, filters?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    filters
      ? `/recipes?page=${pageIndex}&${filters}`
      : `/recipes?page=${pageIndex}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  return {
    recipes: data,
    isLoading,
    isError: error,
    mutate,
  };
}
