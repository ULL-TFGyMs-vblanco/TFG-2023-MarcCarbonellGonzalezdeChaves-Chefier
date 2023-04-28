import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';

const RecipeService = {
  postRecipe: async (url: string, recipe: NewRecipeData) => {
    const session = await getSession();
    const formData = new FormData();
    formData.append('image', recipe.image);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...recipeData } = recipe;
    formData.append('recipe', JSON.stringify(recipeData));
    formData.append('provider', session?.user.provider as string);
    try {
      await axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });
    } catch (err: any) {
      throw new Error(err.response.data.error.message);
    }
  },
};

export default RecipeService;
