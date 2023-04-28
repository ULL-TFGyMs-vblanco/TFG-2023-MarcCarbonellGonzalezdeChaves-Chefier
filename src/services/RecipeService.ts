import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';
import ImagekitUtils from '../utils/ImagekitUtils';

const RecipeService = {
  postRecipe: async (url: string, recipeData: NewRecipeData) => {
    try {
      const url = await ImagekitUtils.uploadImage(recipeData.image);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...rest } = recipeData;
      const recipe = { image: url, ...rest };
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
      throw new Error(JSON.stringify(err));
    }
  },
};

export default RecipeService;
