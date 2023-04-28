import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';
import ImagekitUtils from '../utils/ImagekitUtils';

const RecipeService = {
  postRecipe: async (url: string, recipeData: NewRecipeData) => {
    try {
      const imageUrl = await ImagekitUtils.uploadImage(recipeData.image);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const recipe = { ...recipeData, image: imageUrl };
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
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default RecipeService;
