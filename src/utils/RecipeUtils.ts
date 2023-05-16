import { User } from 'user-types';
import { Valoration } from 'recipe-types';

export default class RecipeUtils {
  public static isAlreadyValorated = (
    valorations: Valoration[],
    user: User
  ) => {
    return valorations.some(
      (valoration: Valoration) => valoration.user.id === user._id
    );
  };

  public static countInteractions = (stat: string[]) => {
    return stat.length > 1000 ? `${stat.length / 1000}k` : stat.length;
  };
}
