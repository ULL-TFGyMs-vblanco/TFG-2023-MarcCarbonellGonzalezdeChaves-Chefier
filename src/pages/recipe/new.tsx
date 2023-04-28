import { NewRecipeForm } from '@/components/recipe/NewRecipeForm';
import { CustomModal } from '@/components/ui/CustomModal';
import { useLoggedUser } from '@/hooks/useLoggedUser';
import RecipeService from '@/services/RecipeService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NewRecipeFormInputs } from 'recipe-types';
import styles from 'src/styles/recipe/NewRecipe.module.css';

const NewRecipe: React.FC = () => {
  const [error, setError] = useState<string | string[]>();
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const { user } = useLoggedUser();
  const router = useRouter();

  useEffect(() => {
    error ? setErrorModal(true) : setErrorModal(false);
  }, [error]);

  const closeSuccessModalHandler = async () => {
    router.push('/');
  };

  const closeErrorModalHandler = async () => {
    setError(undefined);
  };

  const postRecipeHandler = async (data: NewRecipeFormInputs, image: File) => {
    const username = user.nickname ? user.nickname : user.username;
    const recipe = {
      username,
      ...data,
      image: image as File,
    };
    try {
      await RecipeService.postRecipe('/recipe', recipe);
      return true;
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <NewRecipeForm
        onPostRecipe={postRecipeHandler}
        toggleModal={setSuccesModal}
      />
      <CustomModal
        type='success'
        title='SUCCESS'
        visible={successModal}
        handler={setSuccesModal}
        onClose={closeSuccessModalHandler}
      >
        Enhorabuena, tu receta ha sido publicada con éxito!
      </CustomModal>
      <CustomModal
        type='error'
        title='ERROR'
        visible={errorModal}
        handler={setErrorModal}
        onClose={closeErrorModalHandler}
      >
        {`${error}`}
      </CustomModal>
    </div>
  );
};

export default NewRecipe;
