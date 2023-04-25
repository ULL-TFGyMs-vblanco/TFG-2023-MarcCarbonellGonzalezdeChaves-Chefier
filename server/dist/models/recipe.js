"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.RecipeSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
exports.RecipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isLength(value, { max: 50 })) {
                throw new Error('Name must have a maximum of 50 characters');
            }
        },
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String],
        required: true,
        validate: (value) => {
            value.forEach((image) => {
                if (!validator_1.default.isURL(image)) {
                    throw new Error('Image must be a valid URL');
                }
            });
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isLength(value, { max: 200 })) {
                throw new Error('Description have a maximum of 200 characters');
            }
        },
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    tags: {
        type: [String],
        trim: true,
        validate: (value) => {
            value.forEach((tag) => {
                const hashtag = RegExp(/^#/);
                if (!hashtag.test(tag)) {
                    throw new Error('Tags must begin with #');
                }
            });
        },
        default: [],
    },
    difficulty: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isIn(value, ['Fácil', 'Media', 'Difícil'])) {
                throw new Error('Difficulty must be Easy, Medium or Hard');
            }
        },
    },
    cookTime: {
        type: Number,
        required: true,
        validate: (value) => {
            if (value < 0) {
                throw new Error('Cook time must be positive');
            }
        },
    },
    ingredients: {
        type: [{ name: String, quantity: Number, unit: String }],
        required: true,
        validate: (value) => {
            value.forEach((ingredient) => {
                if (ingredient.quantity < 0) {
                    throw new Error('Ingredient quantity must be positive');
                }
            });
        },
    },
    instructions: {
        type: [String],
        required: true,
        validate: (value) => {
            value.forEach((instruction) => {
                if (!validator_1.default.isLength(instruction, { max: 200 })) {
                    throw new Error('Instruction have a maximum of 200 characters');
                }
            });
        },
    },
    valorations: {
        type: [
            {
                username: String,
                comment: String,
                valoration: Number,
                date: Date,
                comments: [{ username: String, comment: String, date: Date }],
            },
        ],
        validate: (value) => {
            value.forEach((valoration) => {
                if (!validator_1.default.isLength(valoration.comment, { max: 100 })) {
                    throw new Error('Valoration comment have a maximum of 100 characters');
                }
                if (!validator_1.default.isIn(valoration.rating.toString(), [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                ])) {
                    throw new Error('Valoration must be between 1 and 5');
                }
                valoration.comments.forEach((comment) => {
                    if (!validator_1.default.isLength(comment.comment, { max: 100 })) {
                        throw new Error('Comment have a maximum of 100 characters');
                    }
                });
            });
        },
        default: [],
    },
});
exports.Recipe = (0, mongoose_1.model)('Recipe', exports.RecipeSchema);
