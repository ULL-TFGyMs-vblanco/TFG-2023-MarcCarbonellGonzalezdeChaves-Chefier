import { User } from 'auth-types';
import { useEffect, useState } from 'react';
import { Recipe, ValidUpdate } from 'recipe-types';

// Custom hook to handle the interactions (likes and saves) of a recipe
export function useInteraction(
  interaction: 'likes' | 'saved',
  recipe: Recipe,
  user: User,
  updateHandler: (recipeId: string, update: ValidUpdate) => Promise<void>
) {
  const [checked, setChecked] = useState<boolean>();

  useEffect(() => {
    if (recipe && user) {
      if (interaction === 'likes') {
        if (recipe.likes.includes(user._id)) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      } else if (interaction === 'saved') {
        if (recipe.saved.includes(user._id)) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      }
    }
  }, [recipe, interaction, user]);

  const check = async () => {
    setChecked(true);
    if (interaction === 'likes') {
      recipe.likes.push(user._id);
      await updateHandler(recipe._id, { likes: recipe.likes });
    } else if (interaction === 'saved') {
      recipe.saved.push(user._id);
      await updateHandler(recipe._id, { saved: recipe.saved });
    }
  };

  const uncheck = async () => {
    setChecked(false);
    if (interaction === 'likes') {
      recipe.likes = recipe.likes.filter((like: string) => like !== user._id);
      await updateHandler(recipe._id, { likes: recipe.likes });
    } else if (interaction === 'saved') {
      recipe.saved = recipe.saved.filter((save: string) => save !== user._id);
      await updateHandler(recipe._id, { saved: recipe.saved });
    }
  };

  return {
    checked,
    check,
    uncheck,
  };
}
