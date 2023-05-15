import { User } from 'user-types';
import { Recipe, Valoration } from 'recipe-types';

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

  public static getMinAndMaxRating = (recipes: Recipe[]) => {
    let min = 5;
    let max = 0;
    recipes.forEach((recipe) => {
      if (recipe.averageRating < min) min = recipe.averageRating;
      if (recipe.averageRating > max) max = recipe.averageRating;
    });
    return [min, max];
  };

  public static getMinAndMaxTime = (recipes: Recipe[]) => {
    let min = 1500;
    let max = 0;
    recipes.forEach((recipe) => {
      if (recipe.cookTime < min) min = recipe.cookTime;
      if (recipe.cookTime > max) max = recipe.cookTime;
    });
    return [min, max];
  };

  public static getDifficulties = (recipes: Recipe[]) => {
    const difficulties = { easy: false, medium: false, hard: false };
    recipes.forEach((recipe) => {
      if (recipe.difficulty === 'Fácil') difficulties.easy = true;
      if (recipe.difficulty === 'Media') difficulties.medium = true;
      if (recipe.difficulty === 'Difícil') difficulties.hard = true;
    });
    return difficulties;
  };

  public static getTags = (recipes: Recipe[]) => {
    const tags = {
      breakfast: false,
      lunch: false,
      dinner: false,
      dessert: false,
      snack: false,
      drink: false,
    };
    recipes.forEach((recipe) => {
      if (recipe.tags.breakfast) tags.breakfast = true;
      if (recipe.tags.lunch) tags.lunch = true;
      if (recipe.tags.dinner) tags.dinner = true;
      if (recipe.tags.dessert) tags.dessert = true;
      if (recipe.tags.snack) tags.snack = true;
      if (recipe.tags.drink) tags.drink = true;
    });
    return tags;
  };
}
