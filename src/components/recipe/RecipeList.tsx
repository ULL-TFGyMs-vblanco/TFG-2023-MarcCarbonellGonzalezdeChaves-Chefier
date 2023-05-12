import { Recipe } from 'recipe-types';
import { RecipeCard } from './RecipeCard';
import styles from '../../styles/recipe/RecipeList.module.css';
import { useRecipes } from '@/hooks/useRecipes';
import { useState } from 'react';
import { Loading, Pagination } from '@nextui-org/react';
import { Title } from '../ui/Title';

interface RecipeListProps {
  filters: string;
}

export const RecipeList: React.FC<RecipeListProps> = ({ filters }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const { recipes, isLoading, isError, mutate } = useRecipes(
    pageIndex,
    filters
  );

  const updateListHandler = async (updatedRecipe: Recipe) => {
    const updatedList = recipes.list.map((recipe: Recipe) =>
      recipe._id === updatedRecipe._id ? updatedRecipe : recipe
    );
    await mutate({ ...recipes, list: updatedList }, false);
  };

  return (
    <div className={styles.list__container}>
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
          <Title sm>
            No&nbsp;quedan&nbsp;más&nbsp;recetas&nbsp;por&nbsp;aquí
          </Title>
        )}
      </div>
    </div>
  );
};
