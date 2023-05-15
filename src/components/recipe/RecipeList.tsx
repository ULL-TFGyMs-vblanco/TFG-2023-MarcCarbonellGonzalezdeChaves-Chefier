import { Recipe } from 'recipe-types';
import { RecipeCard } from './RecipeCard';
import styles from '../../styles/recipe/RecipeList.module.css';
import { useRecipes } from '@/hooks/useRecipes';
import { useEffect, useRef, useState } from 'react';
import { Loading, Pagination } from '@nextui-org/react';
import { Title } from '../ui/Title';
import { FilterBox } from './FilterBox';
import { Card } from '../ui/Card';
import { ParsedUrlQuery, encode } from 'querystring';

interface RecipeListProps {
  filters: ParsedUrlQuery;
  filterbox?: boolean;
  title?: string;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  filters,
  filterbox,
  title,
}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState<number>();
  const { recipes, isLoading, isError, mutate } = useRecipes(
    pageIndex,
    typeof filters === 'string' ? filters : encode(filters)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { search, following, ...baseFilters } = filters;

  console.log(encode({ search, following }));

  const {
    recipes: baseResults,
    isLoading: isLoadingBase,
    isError: isErrorBase,
  } = useRecipes(pageIndex);

  useEffect(() => {
    if (!ref.current) return;
    setListHeight(ref.current.offsetHeight);
    console.log(ref.current.offsetHeight);
  }, []);

  const updateListHandler = async (
    updatedRecipe: Recipe,
    options?: { remove?: boolean }
  ) => {
    let updatedList;
    if (options?.remove) {
      updatedList = recipes.list.filter(
        (recipe: Recipe) => recipe._id !== updatedRecipe._id
      );
    } else {
      updatedList = recipes.list.map((recipe: Recipe) =>
        recipe._id === updatedRecipe._id ? updatedRecipe : recipe
      );
    }
    await mutate({ ...recipes, list: updatedList }, false);
  };

  return (
    <div className={styles.container}>
      {isLoadingBase ? (
        <Loading />
      ) : (
        !isErrorBase &&
        filterbox && (
          <Card className={styles.filterbox__container} reference={ref}>
            <FilterBox recipes={baseResults.list} />
          </Card>
        )
      )}
      <div className={styles.list__container} style={{ minHeight: listHeight }}>
        {title && <Title lg>{title}</Title>}
        <div className={styles.list}>
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Title>
              Oops!&nbsp;Parece&nbsp;que&nbsp;algo&nbsp;salió&nbsp;mal
            </Title>
          ) : recipes.list && recipes.list.length > 0 ? (
            <>
              <div className={styles.list__elements}>
                {recipes.list.map((recipe: Recipe) => (
                  <RecipeCard
                    key={recipe.name}
                    recipe={recipe}
                    onChange={updateListHandler}
                  />
                ))}
              </div>
              <Pagination
                color='error'
                size='lg'
                total={recipes.totalPages ? recipes.totalPages : 1}
                onChange={(page) => setPageIndex(page)}
                className={styles.pagination}
              />
            </>
          ) : (
            <Title sm className={styles.empty__msg}>
              No&nbsp;quedan&nbsp;más&nbsp;recetas&nbsp;por&nbsp;aquí
            </Title>
          )}
        </div>
      </div>
    </div>
  );
};
