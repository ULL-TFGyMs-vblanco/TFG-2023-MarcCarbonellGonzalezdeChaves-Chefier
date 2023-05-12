import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import UserService from '@/services/UserService';
import { useSWRConfig } from 'swr';

// Custom hook to handle the interactions (likes and saves) of a recipe
export function useSave(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();
  // const [saved, setSaved] = useState<boolean>();

  // useEffect(() => {
  //   if (recipe && user) {
  //     if (recipe.saved.includes(user._id)) {
  //       setSaved(true);
  //     } else {
  //       setSaved(false);
  //     }
  //   }
  // }, [recipe, user]);

  const save = async () => {
    // setSaved(true);
    // recipe.saved.push(user._id);
    // user.saved.push(recipe._id);
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

  const removeSave = async () => {
    // setSaved(false);
    // recipe.saved = recipe.saved.filter((save: string) => save !== user._id);
    // user.saved = user.saved.filter((save: string) => save !== recipe._id);
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
