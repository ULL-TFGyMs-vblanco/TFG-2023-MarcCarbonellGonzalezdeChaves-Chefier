import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { useEffect, useState } from 'react';
import { Recipe } from 'recipe-types';
import UserService from '@/services/UserService';

// Custom hook to handle recipe 'liking'
export function useLike(recipe: Recipe, user: User) {
  const [liked, setLiked] = useState<boolean>();

  useEffect(() => {
    if (recipe && user) {
      if (recipe.likes.includes(user._id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [recipe, user]);

  const like = async () => {
    setLiked(true);
    recipe.likes.push(user._id);
    user.likes.push(recipe._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: recipe.likes,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      likes: user.likes,
    });
  };

  const removeLike = async () => {
    setLiked(false);
    recipe.likes = recipe.likes.filter((like: string) => like !== user._id);
    user.likes = user.likes.filter((like: string) => like !== recipe._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: recipe.likes,
    });
    await UserService.updateUser(`/user/${user._id}`, {
      likes: user.likes,
    });
  };

  return {
    liked,
    like,
    removeLike,
  };
}
