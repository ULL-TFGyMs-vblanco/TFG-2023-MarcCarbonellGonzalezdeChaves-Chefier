import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { useEffect, useState } from 'react';
import { Recipe } from 'recipe-types';
import { useSWRConfig } from 'swr';

// Custom hook to handle the interactions (likes and saves) of a recipe
export function useSave(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();
  const [saved, setSaved] = useState<boolean>();

  useEffect(() => {
    if (recipe && user) {
      if (recipe.saved.includes(user._id)) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [recipe, user]);

  const save = async () => {
    setSaved(true);
    recipe.saved.push(user._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: recipe.saved,
    });
    await mutate('/recipe/' + recipe._id);
  };

  const removeSave = async () => {
    setSaved(false);
    recipe.saved = recipe.saved.filter((save: string) => save !== user._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: recipe.saved,
    });
    await mutate('/recipe/' + recipe._id);
  };

  return {
    saved,
    save,
    removeSave,
  };
}
