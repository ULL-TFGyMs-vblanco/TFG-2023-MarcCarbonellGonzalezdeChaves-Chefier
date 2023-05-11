import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { useEffect, useState } from 'react';
import { Recipe } from 'recipe-types';
import { useSWRConfig } from 'swr';

// Custom hook to handle recipe 'liking'
export function useLike(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();
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
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: recipe.likes,
    });
    await mutate('/recipe/' + recipe._id);
  };

  const removeLike = async () => {
    setLiked(false);
    recipe.likes = recipe.likes.filter((like: string) => like !== user._id);
    await RecipeService.updateRecipe(`/recipe/${recipe._id}`, {
      likes: recipe.likes,
    });
    await mutate('/recipe/' + recipe._id);
  };

  return {
    liked,
    like,
    removeLike,
  };
}
