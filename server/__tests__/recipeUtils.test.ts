import { UserDocumentInterface } from '../src/models/user';
import RecipeUtils from '../src/utils/RecipeUtils';
import { describe, expect, it } from 'vitest';

describe('Recipe utils', (): void => {
  it('should return true as update is valid', async () => {
    const update = {
      likes: '123',
      saved: '123',
      $push: { valorations: '123' },
      averageRating: '123',
    };
    const isValid = RecipeUtils.isValidUpdate(update);
    expect(isValid).toBe(true);
  });
  it('should return false as update is not valid', async () => {
    const update = {
      likes: '123',
      saved: '123',
      valorations: '123',
      averageRating: '123',
      invalid: '123',
    };
    const isValid = RecipeUtils.isValidUpdate(update);
    expect(isValid).toBe(false);
  });
  it('should return the aggregate search', async () => {
    const searchTerms = 'search terms';
    const search = RecipeUtils.getAggregateSearch(searchTerms);
    expect(search).toEqual({
      index: 'default',
      compound: {
        filter: [
          {
            text: {
              query: 'search terms',
              path: {
                wildcard: '*',
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          },
        ],
      },
    });
  });
  it('should return the aggregate following', async () => {
    const user = {
      following: ['123', '456'],
    };
    const following = RecipeUtils.getAggregateFollowing(
      user as UserDocumentInterface
    );
    expect(following).toEqual({
      'user.id': {
        $in: ['123', '456'],
      },
    });
  });
  it('should return an aggregate with id 0', async () => {
    const following = RecipeUtils.getAggregateFollowing(null);
    expect(following).toEqual({
      'user.id': {
        $in: ['0'],
      },
    });
  });
  it('should return the aggregate match', async () => {
    const filters = {
      cookTime: '10-20',
      averageRating: '3-5',
      tags: ['breakfast', 'dinner'],
      difficulty: 'easy',
      likes: '1234',
    };
    const match = RecipeUtils.getAggregateMatch(filters);
    expect(match).toEqual({
      $and: [
        {
          cookTime: {
            $gte: 10,
            $lte: 20,
          },
        },
        {
          averageRating: {
            $gte: 3,
            $lte: 5,
          },
        },
        {
          $or: [{ 'tags.breakfast': 'Desayuno' }, { 'tags.dinner': 'Cena' }],
        },
        {
          $or: [{ difficulty: 'Fácil' }],
        },
        {
          likes: {
            $in: ['1234'],
          },
        },
      ],
    });
  });
  it('should return 4 as average rating', async () => {
    const recipe = {
      valorations: [{ rating: 4 }, { rating: 6 }, { rating: 2 }, { rating: 4 }],
    };
    const average = RecipeUtils.getAverageRating(recipe);
    expect(average).toBe(4);
  });
  it('should return 0 as there is no valorations', async () => {
    const recipe = {
      valorations: [],
    };
    const average = RecipeUtils.getAverageRating(recipe);
    expect(average).toBe(0);
  });
  it('should return 0.5 and 4.5 as min and max rating', async () => {
    const recipes = [
      {
        valorations: [
          { rating: 4 },
          { rating: 6 },
          { rating: 2 },
          { rating: 4 },
        ],
      },
      {
        valorations: [
          { rating: 4 },
          { rating: 6 },
          { rating: 2 },
          { rating: 4 },
        ],
      },
      {
        valorations: [
          { rating: 4 },
          { rating: 6 },
          { rating: 2 },
          { rating: 4 },
        ],
      },
    ];
    const minMax = RecipeUtils.getMinAndMaxRating(recipes);
    expect(minMax).toEqual([4, 4]);
  });
  it('should return 0 and 5 as min and max cook time', async () => {
    const recipes = [
      { cookTime: 10 },
      { cookTime: 5 },
      { cookTime: 15 },
      { cookTime: 0 },
    ];
    const minMax = RecipeUtils.getMinAndMaxTime(recipes);
    expect(minMax).toEqual([0, 15]);
  });
  it('should return easy and hard as difficulties', async () => {
    const recipes = [
      { difficulty: 'Fácil' },
      { difficulty: 'Fácil' },
      { difficulty: 'Difícil' },
      { difficulty: 'Fácil' },
    ];
    const difficulties = RecipeUtils.getDifficulties(recipes);
    expect(difficulties).toEqual({ easy: true, medium: false, hard: true });
  });
  it('should return breackfast and dinner', async () => {
    const recipes = [
      { tags: { breakfast: 'Desayuno' } },
      { tags: { dinner: 'Cena' } },
      { tags: { dinner: 'Cena' } },
      { tags: { dinner: 'Cena' } },
    ];
    const tags = RecipeUtils.getTags(recipes);
    expect(tags).toEqual({
      breakfast: true,
      dessert: false,
      lunch: false,
      dinner: true,
      drink: false,
      snack: false,
    });
  });
});
