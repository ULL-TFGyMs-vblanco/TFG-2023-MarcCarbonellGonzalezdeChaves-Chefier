import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import UserService from '@/services/UserService';
import { useSWRConfig } from 'swr';

// Custom hook to handle recipe 'liking'
export function useLike(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();

  const like = async () => {
    const updatedRecipeLikes = [...recipe.likes, user._id];
    const updatedUserLikes = [...user.likes, recipe._id];
    await mutate(
      `/recipe/${recipe._id}`,
      { ...recipe, likes: updatedRecipeLikes },
      false
    );
    await mutate(
      `/username/${user.username}`,
      { ...user, likes: updatedUserLikes },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: updatedRecipeLikes,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      likes: updatedUserLikes,
    });
  };

  const removeLike = async () => {
    const updatedRecipeLikes = recipe.likes.filter(
      (like: string) => like !== user._id
    );
    const updatedUserLikes = user.likes.filter(
      (like: string) => like !== recipe._id
    );
    await mutate(
      `/recipe/${recipe._id}`,
      { ...recipe, likes: updatedRecipeLikes },
      false
    );
    await mutate(
      `/username/${user.username}`,
      { ...user, likes: updatedUserLikes },
      false
    );
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: updatedRecipeLikes,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      likes: updatedUserLikes,
    });
  };

  return {
    like,
    removeLike,
  };
}
