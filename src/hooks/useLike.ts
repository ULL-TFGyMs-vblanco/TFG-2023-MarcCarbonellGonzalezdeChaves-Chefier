import RecipeService from '@/services/RecipeService';
import { User } from 'user-types';
import { Recipe } from 'recipe-types';
import UserService from '@/services/UserService';
import { useSWRConfig } from 'swr';

// Custom hook to handle recipe 'liking'
export function useLike(recipe: Recipe, user: User) {
  const { mutate } = useSWRConfig();
  // const [liked, setLiked] = useState<boolean>();

  // useEffect(() => {
  //   if (recipe && user) {
  //     if (recipe.likes.includes(user._id)) {
  //       setLiked(true);
  //     } else {
  //       setLiked(false);
  //     }
  //   }
  // }, [recipe, user]);

  const like = async () => {
    // setLiked(true);
    // recipe.likes.push(user._id);
    // user.likes.push(recipe._id);
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
    // setLiked(false);
    // recipe.likes = recipe.likes.filter((like: string) => like !== user._id);
    // user.likes = user.likes.filter((like: string) => like !== recipe._id);
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
