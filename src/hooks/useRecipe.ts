import useSWR from 'swr';
import axios from '../../axios_config';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useRecipe(id: string) {
  const { data, error, isLoading } = useSWR('/recipe/' + id, fetcher);

  return {
    recipe: data,
    isLoading,
    isError: error,
  };
}
