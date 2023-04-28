import { NewRecipeData } from 'recipe-types';
import axios from '../../axios_config';
import { getSession } from 'next-auth/react';

const RecipeService = {
  postRecipe: async (url: string, recipe: NewRecipeData) => {
    try {
      // const imageUrl = await ImagekitUtils.uploadImage(recipeData.image);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // const recipe = { ...recipeData, image: imageUrl };
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
        // await axios.post(
        //   url,
        //   {
        //     provider: session?.user.provider,
        //     recipe,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${session?.user.accessToken}`,
        //     },
        //   }
        // );
      } catch (err: any) {
        throw new Error(err.response.data.error);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  },
};

export default RecipeService;
