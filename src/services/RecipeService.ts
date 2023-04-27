import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';

const RecipeService = {
  postRecipe: async (url: string, recipe: NewRecipeData) => {
    const session = await getSession();
    try {
      await axios.post(
        url,
        {
          provider: session?.user.provider,
          recipe,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
  },
};

export default RecipeService;
