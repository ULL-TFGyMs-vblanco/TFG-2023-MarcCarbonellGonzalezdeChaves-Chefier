import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { useState } from 'react';
import { Recipe } from 'recipe-types';
import { useSWRConfig } from 'swr';

// Custom hook to handle the user valoration of a recipe
export function useValoration(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const valorate = async (title: string, rating: number, comment?: string) => {
    setIsLoading(true);
    recipe.valorations.push(
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
          }
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: recipe.valorations,
    });
    await mutate('/recipe/' + recipe._id);
    setIsLoading(false);
  };

  const removeValoration = async () => {
    recipe.valorations = recipe.valorations.filter(
      (valoration: any) => valoration.user.id !== user._id
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      valorations: recipe.valorations,
    });
    await mutate('/recipe/' + recipe._id);
  };

  return {
    isLoading,
    valorate,
    removeValoration,
  };
}
