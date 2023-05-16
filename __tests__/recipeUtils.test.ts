import { Valoration } from 'recipe-types';
import RecipeUtils from 'src/utils/RecipeUtils';
import { User } from 'user-types';
import { describe, expect, it } from 'vitest';

describe('Recipe utils', (): void => {
  it('should return 4 as average rating', async () => {
    const valorations = [
      { rating: 4 },
      { rating: 6 },
      { rating: 2 },
      { rating: 4 },
    ];
    const average = RecipeUtils.getAverageRating(valorations as Valoration[]);
    expect(average).toBe(4);
  });
  it('should return 0 as there is no valorations', async () => {
    const valorations: Valoration[] = [];
    const average = RecipeUtils.getAverageRating(valorations);
    expect(average).toBe(0);
  });
  it('should return true as recipe is already valorated', async () => {
    const valorations = [
      { rating: 4, user: { id: '1' } },
      { rating: 6, user: { id: '2' } },
      { rating: 2, user: { id: '3' } },
      { rating: 4, user: { id: '4' } },
    ];
    const user = { _id: '3' };
    const isAlreadyValorated = RecipeUtils.isAlreadyValorated(
      valorations as Valoration[],
      user as User
    );
    expect(isAlreadyValorated).toBe(true);
  });
  it('should return 1k as interactions', async () => {
    const stat = new Array(1002);
    const interactions = RecipeUtils.countInteractions(stat);
    expect(interactions).toBe('1k');
  });
  it('should return 999 as interactions', async () => {
    const stat = new Array(999);
    const interactions = RecipeUtils.countInteractions(stat);
    expect(interactions).toBe(999);
  });
});
