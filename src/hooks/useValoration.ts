import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import { useSWRConfig } from 'swr';

// Custom hook to handle the user valoration of a recipe
export function useValoration(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();

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
    await mutate(
      '/recipe/' + recipe._id,
      { ...recipe, valorations: updatedValorations },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: recipe.valorations,
    });
  };

  const removeValoration = async () => {
    const updatedValorations = recipe.valorations.filter(
      (valoration: any) => valoration.user.id !== user._id
    );
    await mutate(
      '/recipe/' + recipe._id,
      { ...recipe, valorations: updatedValorations },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: recipe.valorations,
    });
  };

  return {
    valorate,
    removeValoration,
  };
}
