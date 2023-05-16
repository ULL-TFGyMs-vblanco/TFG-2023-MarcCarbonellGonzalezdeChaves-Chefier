import { useRecipe } from '../../hooks/useRecipe';
import { useRouter } from 'next/router';
import RecipeService from '../../services/RecipeService';
import { useSWRConfig } from 'swr';
import { Recipe } from '../../components/recipe/Recipe';
import { Card } from '../../components/ui/Card';
import { Loading } from '@nextui-org/react';
import { Title } from '../../components/ui/Title';
import { CustomModal } from '../../components/ui/CustomModal';
import { useState } from 'react';
import UserService from '../../services/UserService';

const RecipePage = () => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { recipe, isLoading, isError } = useRecipe(router.query.id as string);
  const [errorModal, setErrorModal] = useState(false);

  const deleteHandler = async (recipeId: string) => {
    try {
      await RecipeService.deleteRecipe(`/recipe/${recipeId}`);
      await UserService.updateUser(`/user/${recipe?.user.id}`, {
        $pull: { recipes: recipeId },
      });
      await UserService.updateUser(`/users?likes=${recipeId}`, {
        $pull: { likes: recipeId },
      });
      await UserService.updateUser(`/users?saved=${recipeId}`, {
        $pull: { saved: recipeId },
      });
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
          recipe && <Recipe recipe={recipe} deleteHandler={deleteHandler} />
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
