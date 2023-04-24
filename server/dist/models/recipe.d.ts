import { Document, Schema } from 'mongoose';
export interface RecipeDocumentInterface extends Document {
    name: string;
    username: string;
    images: string[];
    description: string;
    date: Date;
    tags: [string];
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    cookTime: number;
    ingredients: [{
        name: string;
        quantity: number;
        unit: string;
    }];
    instructions: [string];
    valorations: [
        {
            username: string;
            comment: string;
            rating: number;
            date: Date;
            comments: [
                {
                    username: string;
                    comment: string;
                    date: Date;
                }
            ];
        }
    ];
}
export declare const RecipeSchema: Schema<RecipeDocumentInterface, import("mongoose").Model<RecipeDocumentInterface, any, any>, undefined, {}>;
export declare const Recipe: import("mongoose").Model<RecipeDocumentInterface, {}, {}>;
