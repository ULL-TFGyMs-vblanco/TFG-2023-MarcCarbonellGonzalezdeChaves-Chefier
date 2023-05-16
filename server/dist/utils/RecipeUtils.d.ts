import { RecipeDocumentInterface } from 'src/models/recipe';
export default class RecipeUtils {
    static isValidUpdate: (update: any) => boolean;
    static getAggregateSearch: (searchTerms: string) => {
        index: string;
        compound: {
            filter: object[];
        };
    };
    static getAggregateMatch: (filters: any) => {
        $and: object[];
    };
    static getAverageRating: (recipe: RecipeDocumentInterface) => number;
    static getMinAndMaxRating: (recipes: RecipeDocumentInterface[]) => number[];
    static getMinAndMaxTime: (recipes: RecipeDocumentInterface[]) => number[];
    static getDifficulties: (recipes: RecipeDocumentInterface[]) => {
        easy: boolean;
        medium: boolean;
        hard: boolean;
    };
    static getTags: (recipes: RecipeDocumentInterface[]) => {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
        dessert: boolean;
        snack: boolean;
        drink: boolean;
    };
}
