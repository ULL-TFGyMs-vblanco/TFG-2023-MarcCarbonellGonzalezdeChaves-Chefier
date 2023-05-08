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
    user: {
        type: { name: String, image: String, id: String },
        required: true,
    },
    image: {
        type: {
            url: String,
            fileId: String,
        },
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isURL(value.url)) {
                throw new Error('Image must be a valid URL');
            }
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
        type: {
            breakfast: Boolean,
            lunch: Boolean,
            dinner: Boolean,
            dessert: Boolean,
            snack: Boolean,
        },
        default: {
            breakfast: false,
            lunch: false,
            dinner: false,
            dessert: false,
            snack: false,
        },
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
    rations: {
        type: Number,
        required: true,
        validate: (value) => {
            if (value <= 0) {
                throw new Error('Rations must be positive');
            }
        },
    },
    ingredients: {
        type: [{ name: String, quantity: Number, unit: String }],
        required: true,
        validate: (value) => {
            value.forEach((ingredient) => {
                if (!validator_1.default.isLength(ingredient.name, { max: 50 })) {
                    throw new Error('Ingredient name must have a maximum of 50 characters');
                }
                if (ingredient.quantity <= 0) {
                    throw new Error('Ingredient quantity must be positive');
                }
                if (!validator_1.default.isLength(ingredient.unit, { max: 20 })) {
                    throw new Error('Ingredient unit must have a maximum of 20 characters');
                }
            });
        },
    },
    instructions: {
        type: [{ step: String }],
        required: true,
        validate: (value) => {
            value.forEach((instruction) => {
                if (!validator_1.default.isLength(instruction.step, { max: 200 })) {
                    throw new Error('Instruction have a maximum of 200 characters');
                }
            });
        },
    },
    valorations: {
        type: [
            {
                user: {
                    id: String,
                    name: String,
                    image: String,
                },
                comment: {
                    type: String,
                    required: false,
                },
                title: String,
                rating: Number,
                date: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
        validate: (value) => {
            value.forEach((valoration) => {
                if (valoration.comment &&
                    !validator_1.default.isLength(valoration.comment, { max: 100 })) {
                    throw new Error('Valoration comment have a maximum of 100 characters');
                }
                if (!validator_1.default.isIn(valoration.rating.toString(), [
                    '0',
                    '0.5',
                    '1',
                    '1.5',
                    '2',
                    '2.5',
                    '3',
                    '3.5',
                    '4',
                    '4.5',
                    '5',
                ])) {
                    throw new Error('Valoration must be between 1 and 5');
                }
            });
        },
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    saved: {
        type: [String],
        default: [],
    },
});
exports.Recipe = (0, mongoose_1.model)('Recipe', exports.RecipeSchema);
