import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useRecipes(pageIndex: number, filters: string) {
  const { data, error, isLoading } = useSWR(
    `/recipes?page=${pageIndex}${filters}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  return {
    recipes: data,
    isLoading,
    isError: error,
  };
}
