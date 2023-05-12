import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { useEffect, useState } from 'react';
import { Recipe } from 'recipe-types';
import UserService from '@/services/UserService';

// Custom hook to handle the interactions (likes and saves) of a recipe
export function useSave(recipe: Recipe, user: User) {
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
    user.saved.push(recipe._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: recipe.saved,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      saved: user.saved,
    });
  };

  const removeSave = async () => {
    setSaved(false);
    recipe.saved = recipe.saved.filter((save: string) => save !== user._id);
    user.saved = user.saved.filter((save: string) => save !== recipe._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: recipe.saved,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      saved: user.saved,
    });
  };

  return {
    saved,
    save,
    removeSave,
  };
}
