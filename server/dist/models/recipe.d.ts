import { Document, Schema } from 'mongoose';
export interface RecipeDocumentInterface extends Document {
    name: string;
    user: {
        name: string;
        image: string;
    };
    image: {
        url: string;
        fileId: string;
    };
    description: string;
    date: Date;
    tags: {
        breakfast: boolean;
        lunch: boolean;
        dinner: boolean;
        dessert: boolean;
        snack: boolean;
        drink: boolean;
    };
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    cookTime: number;
    rations: number;
    ingredients: [{
        name: string;
        quantity: number;
        unit: string;
    }];
    instructions: [{
        step: string;
    }];
    valorations: [
        {
            user: {
                name: string;
                image: string;
            };
            title: string;
            comment: string;
            rating: number;
            date: Date;
        }
    ];
    likes: [string];
    saved: [string];
}
export declare const RecipeSchema: Schema<RecipeDocumentInterface, import("mongoose").Model<RecipeDocumentInterface, any, any>, undefined, {}>;
export declare const Recipe: import("mongoose").Model<RecipeDocumentInterface, {}, {}>;
