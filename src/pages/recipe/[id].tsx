import { useRecipe } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import { ValidUpdate } from 'recipe-types';
import RecipeService from '@/services/RecipeService';
import { useSWRConfig } from 'swr';
import { Recipe } from '@/components/recipe/Recipe';
import { Card } from '@/components/ui/Card';
import styles from '@/styles/recipe/RecipePage.module.css';
import { Loading } from '@nextui-org/react';
import { Title } from '@/components/ui/Title';

const RecipePage = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { recipe, isLoading, isError } = useRecipe(router.query.id as string);

  const updateHandler = async (update: ValidUpdate) => {
    try {
      await RecipeService.updateRecipe(`/recipe/${recipe._id}`, update);
      mutate('/recipe/' + recipe._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={styles.card} testid='form-card'>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Title>Oops! Ha ocurrido un error al cargar la receta.</Title>
      ) : (
        recipe && <Recipe recipe={recipe} updateHandler={updateHandler} />
      )}
    </Card>
  );
};

export default RecipePage;
