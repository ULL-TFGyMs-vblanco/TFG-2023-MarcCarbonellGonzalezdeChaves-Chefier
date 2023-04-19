"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isLength(value, { max: 20 })) {
                throw new Error('Username must have at most 20 characters');
            }
            if (!validator_1.default.isLowercase(value)) {
                throw new Error('Username must be in lower case');
            }
        },
    },
    nickname: {
        type: String,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isLength(value, { max: 10 })) {
                throw new Error('Nickname must have at most 20 characters');
            }
        },
    },
    description: {
        type: String,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isLength(value, { max: 100 })) {
                throw new Error('Description must be less than 100 characters');
            }
        },
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
    birthdate: {
        type: Date,
        validate: (value) => {
            if (value > new Date()) {
                throw new Error('Birthdate must be in the past');
            }
        },
    },
    image: {
        type: String,
        default: `${process.env.CDN_URL}avatar_default.jpg`,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isURL(value)) {
                throw new Error('Image must be a valid URL');
            }
        },
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email not valid');
            }
        },
    },
    password: {
        type: String,
        trim: true,
        validate: (value) => {
            if (!validator_1.default.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 0,
            })) {
                throw new Error('Must be a strong password');
            }
        },
    },
    following: {
        type: [String],
        default: [],
        required: false,
    },
    followers: {
        type: [String],
        default: [],
        required: false,
    },
    recipes: {
        type: [String],
        default: [],
        required: false,
    },
    likes: {
        type: [String],
        default: [],
        required: false,
    },
    saved: {
        type: [String],
        default: [],
        required: false,
    },
});
exports.User = (0, mongoose_1.model)('User', exports.UserSchema);
