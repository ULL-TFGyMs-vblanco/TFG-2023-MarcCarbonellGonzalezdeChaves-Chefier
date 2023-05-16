import { NewRecipeData, ValidUpdate } from 'recipe-types';
import axios from '../../axios_config';
import { getSession, signOut } from 'next-auth/react';

const RecipeService = {
  postRecipe: async (url: string, recipe: NewRecipeData) => {
    const session = await getSession();
    const formData = new FormData();
    formData.append('image', recipe.image);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...recipeData } = recipe;
    formData.append('recipe', JSON.stringify(recipeData));
    try {
      const res = await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session?.user.accessToken}`,
          Provider: session?.user.provider as string,
        },
      });
      return res.data.recipe;
    } catch (err: any) {
      if (err.response.status === 401) {
        await signOut({ callbackUrl: '/auth/login?error=session%20expired' });
      }
      throw new Error(err.response.data.error.message);
    }
  },

  updateRecipe: async (url: string, update: ValidUpdate) => {
    const session = await getSession();
    try {
      await axios.patch(
        url,
        { update },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            Provider: session?.user.provider as string,
          },
        }
      );
    } catch (err: any) {
      if (err.response.status === 401) {
        await signOut({ callbackUrl: '/auth/login?error=session%20expired' });
      }
      throw new Error(err.response.data.error.message);
    }
  },

  deleteRecipe: async (url: string) => {
    const session = await getSession();
    try {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
          Provider: session?.user.provider as string,
        },
      });
    } catch (err: any) {
      if (err.response.status === 401) {
        await signOut({ callbackUrl: '/auth/login?error=session%20expired' });
      }
      throw new Error(err.response.data.error.message);
    }
  },
};

export default RecipeService;
