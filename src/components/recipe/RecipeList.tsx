import { Recipe } from 'recipe-types';
import { RecipeCard } from './RecipeCard';
import styles from '../../styles/recipe/RecipeList.module.css';
import { useRecipes } from '../../hooks/useRecipes';
import { useState } from 'react';
import { Loading, Pagination, Popover } from '@nextui-org/react';
import { Title } from '../ui/Title';
import { FilterBox } from './FilterBox';
import { Card } from '../ui/Card';
import { ParsedUrlQuery, encode } from 'querystring';
import { BiFilter } from 'react-icons/bi';

// Props for RecipeList component
interface RecipeListProps {
  // Filters to be applied
  filters: ParsedUrlQuery;
  // Whether to show the filter box
  filterbox?: boolean;
  // Title to be displayed
  title?: string;
}

// Recipe list component
export const RecipeList: React.FC<RecipeListProps> = ({
  filters,
  filterbox,
  title,
}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { recipes, isLoading, isError, mutate } = useRecipes(
    pageIndex,
    typeof filters === 'string' ? filters : encode(filters)
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { search, following, ...baseFilters } = filters;

  const {
    recipes: baseResults,
    isLoading: isLoadingBase,
    isError: isErrorBase,
  } = useRecipes(pageIndex);

  // Function to handle recipe list update
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
        filterbox &&
        baseResults.list.length > 0 && (
          <Card className={styles.filterbox__container}>
            <FilterBox recipes={baseResults.metadata} title />
          </Card>
        )
      )}
      <div className={styles.list__container}>
        <div className={styles.header}>
          {title && <Title lg>{title}</Title>}
          {isLoadingBase ? (
            <Loading />
          ) : (
            !isErrorBase &&
            filterbox &&
            baseResults.list.length > 0 && (
              <div className={styles.filterbox__popover}>
                <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                  <Popover.Trigger>
                    <button className={styles.popover__btn}>
                      <BiFilter size={16} />
                      Filtros
                    </button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <div className={styles.filterbox__popover__container}>
                      <FilterBox recipes={baseResults.metadata} />
                    </div>
                  </Popover.Content>
                </Popover>
              </div>
            )
          )}
        </div>
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
