import RecipeService from '../services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import UserService from '../services/UserService';
import { useSWRConfig } from 'swr';

// Custom hook to handle recipe saving
export function useSave(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();

  // Function to save a recipe
  const save = async () => {
    const updatedRecipeSaved = [...recipe.saved, user._id];
    const updatedUserSaved = [...user.saved, recipe._id];
    await mutate(
      `/recipe/${recipe._id}`,
      { ...recipe, saved: updatedRecipeSaved },
      false
    );
    await mutate(
      `/username/${user.username}`,
      { ...user, saved: updatedUserSaved },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: updatedRecipeSaved,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      saved: updatedUserSaved,
    });
  };

  // Function to remove recipe from saved
  const removeSave = async () => {
    const updatedRecipeSaved = recipe.saved.filter(
      (save: string) => save !== user._id
    );
    const updatedUserSaved = user.saved.filter(
      (save: string) => save !== recipe._id
    );
    await mutate(
      `/recipe/${recipe._id}`,
      { ...recipe, saved: updatedRecipeSaved },
      false
    );
    await mutate(
      `/username/${user.username}`,
      { ...user, saved: updatedUserSaved },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      saved: updatedRecipeSaved,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      saved: updatedUserSaved,
    });
  };

  return {
    save,
    removeSave,
  };
}
