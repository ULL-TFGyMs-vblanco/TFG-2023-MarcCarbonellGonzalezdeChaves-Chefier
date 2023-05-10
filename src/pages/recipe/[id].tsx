import { useRecipe } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import { ValidUpdate } from 'recipe-types';
import RecipeService from '@/services/RecipeService';
import { useSWRConfig } from 'swr';
import { Recipe } from '@/components/recipe/Recipe';
import { Card } from '@/components/ui/Card';
import { Loading } from '@nextui-org/react';
import { Title } from '@/components/ui/Title';
import { CustomModal } from '@/components/ui/CustomModal';
import { useState } from 'react';

const RecipePage = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { recipe, isLoading, isError } = useRecipe(router.query.id as string);
  const [errorModal, setErrorModal] = useState(false);

  const updateHandler = async (recipeId: string, update: ValidUpdate) => {
    try {
      await RecipeService.updateRecipe(`/recipe/${recipeId}`, update);
      await mutate('/recipe/' + recipeId);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (recipeId: string) => {
    try {
      await RecipeService.deleteRecipe(`/recipe/${recipeId}`);
      await mutate('/recipe/' + recipeId);
      await router.push('/');
    } catch (error) {
      setErrorModal(true);
    }
  };

  return (
    <>
      <Card testid='form-card'>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Title>Receta no encontrada</Title>
        ) : (
          recipe && (
            <Recipe
              recipe={recipe}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          )
        )}
      </Card>
      <CustomModal
        type='error'
        title='Error'
        visible={errorModal}
        handler={setErrorModal}
        onClose={() => setErrorModal(false)}
      >
        Oops! Ha ocurrido un error al intentar eliminar la receta. Inténtalo de
        nuevo más tarde.
      </CustomModal>
    </>
  );
};

export default RecipePage;
