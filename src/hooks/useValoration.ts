import { User } from 'auth-types';
import { useState } from 'react';
import { Recipe, ValidUpdate } from 'recipe-types';

// Custom hook to handle the stats (likes and saves) of a recipe
export function useValoration(
  recipe: Recipe,
  user: User,
  updateHandler: (update: ValidUpdate) => Promise<void>
) {
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
    await updateHandler({ valorations: recipe.valorations });
    setIsLoading(false);
  };

  const removeValoration = async () => {
    recipe.valorations = recipe.valorations.filter(
      (valoration: any) => valoration.user.id !== user._id
    );
    await updateHandler({ valorations: recipe.valorations });
  };

  return {
    isLoading,
    valorate,
    removeValoration,
  };
}
