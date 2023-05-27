import { User } from 'user-types';
import { Valoration } from 'recipe-types';

// Utils for recipes
export default class RecipeUtils {
  // Get the average rating of a recipe
  public static getAverageRating = (valorations: Valoration[]) => {
    const average =
      valorations.reduce(
        (acc: number, valoration: Valoration) => acc + valoration.rating,
        0
      ) / valorations.length;
    return isNaN(average) ? 0 : Math.round(average * 2) / 2;
  };

  // Check if a user has already valorated a recipe
  public static isAlreadyValorated = (
    valorations: Valoration[],
    user: User
  ) => {
    return valorations.some(
      (valoration: Valoration) => valoration.user.id === user._id
    );
  };

  // Format a recipe's number of interactions (likes or saves)
  public static countInteractions = (stat: string[]) => {
    return stat.length > 1000
      ? `${Math.floor(stat.length / 1000)}k`
      : stat.length;
  };
}
