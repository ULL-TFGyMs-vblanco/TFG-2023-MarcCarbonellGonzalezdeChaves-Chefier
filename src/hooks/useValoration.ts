import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import { useSWRConfig } from 'swr';
import RecipeUtils from '@/utils/RecipeUtils';

// Custom hook to handle the user valoration of a recipe
export function useValoration(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();

  // Function to valorate a recipe
  const valorate = async (title: string, rating: number, comment?: string) => {
    const updatedValorations = [
      ...recipe.valorations,
      comment
        ? {
            user: {
              id: user._id,
              name: user.nickname ? user.nickname : user.username,
              image: user.image,
            },
            title: title as string,
            rating: rating,
            date: new Date().toISOString(),
            comment: comment,
          }
        : {
            user: {
              id: user._id,
              name: user.nickname ? user.nickname : user.username,
              image: user.image,
            },
            title: title as string,
            rating: rating,
            date: new Date().toISOString(),
          },
    ];
    const uptdatedRating = RecipeUtils.getAverageRating(updatedValorations);
    await mutate(
      '/recipe/' + recipe._id,
      {
        ...recipe,
        valorations: updatedValorations,
        averageRating: uptdatedRating,
      },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: updatedValorations,
      averageRating: uptdatedRating,
    });
  };

  // Function to remove valoration from a recipe
  const removeValoration = async () => {
    const updatedValorations = recipe.valorations.filter(
      (valoration: any) => valoration.user.id !== user._id
    );
    const uptdatedRating = RecipeUtils.getAverageRating(updatedValorations);
    await mutate(
      '/recipe/' + recipe._id,
      {
        ...recipe,
        valorations: updatedValorations,
        averageRating: uptdatedRating,
      },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: updatedValorations,
      averageRating: uptdatedRating,
    });
  };

  return {
    valorate,
    removeValoration,
  };
}
