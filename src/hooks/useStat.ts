import { User } from 'auth-types';
import { useState } from 'react';
import { Recipe, ValidUpdate } from 'recipe-types';

// Custom hook to handle the stats (likes and saves) of a recipe
export function useStat(
  stat: 'likes' | 'saved',
  recipe: Recipe,
  user: User,
  updateHandler: (update: ValidUpdate) => Promise<void>
) {
  const [checked, setChecked] = useState<boolean>();

  if (stat === 'likes') {
    if (recipe.likes.includes(user._id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  } else if (stat === 'saved') {
    if (recipe.saved.includes(user._id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  const check = async () => {
    setChecked(true);
    if (stat === 'likes') {
      recipe.likes.push(user._id);
      await updateHandler({ likes: recipe.likes });
    } else if (stat === 'saved') {
      recipe.saved.push(user._id);
      await updateHandler({ saved: recipe.saved });
    }
  };

  const uncheck = async () => {
    setChecked(false);
    if (stat === 'likes') {
      recipe.likes = recipe.likes.filter((like: string) => like !== user._id);
      await updateHandler({ likes: recipe.likes });
    } else if (stat === 'saved') {
      recipe.saved = recipe.saved.filter((save: string) => save !== user._id);
      await updateHandler({ saved: recipe.saved });
    }
  };

  return {
    checked,
    check,
    uncheck,
  };
}
