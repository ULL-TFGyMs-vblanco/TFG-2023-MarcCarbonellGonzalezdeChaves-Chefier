import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';
import ImagekitUtils from '../utils/ImagekitUtils';

const RecipeService = {
  postRecipe: async (url: string, recipeData: NewRecipeData) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      ImagekitUtils.uploadImage(
        e.target?.result as string,
        recipeData.name,
        `/images/posts/${recipeData.username}`
      )
        .then(async (res) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { image, ...rest } = recipeData;
          const recipe = { image: res.url, ...rest };
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
            ImagekitUtils.deleteImage(res.fileId);
            throw new Error(err.response.data.error);
          }
        })
        .catch((err) => {
          throw new Error(JSON.stringify(err));
        });
    };
    reader.onerror = function (e) {
      console.log('Error : ' + e.type);
    };
    reader.readAsText(recipeData.image, 'base64');
  },
};

export default RecipeService;
