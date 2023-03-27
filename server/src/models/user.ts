import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  username: string;
  nickname: string;
  description: string;
  birthdate: Date;
  avatar: string;
  email: string;
  password: string;
  following: [string];
  followers: [string];
  recipes: [string];
  likes: [string];
  saved: [string];
}

export const UserSchema = new Schema<UserDocumentInterface>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 20 })) {
        throw new Error('Username must have at most 20 characters');
      }
      if (!validator.isLowercase(value)) {
        throw new Error('Username must be in lower case');
      }
    },
  },
  nickname: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 10 })) {
        throw new Error('Nickname must have at most 20 characters');
      }
    },
  },
  description: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (!validator.isLength(value, { max: 100 })) {
        throw new Error('Description must be less than 100 characters');
      }
    },
  },
  birthdate: {
    type: Date,
    validate: (value: Date) => {
      if (value > new Date()) {
        throw new Error('Birthdate must be in the past');
      }
    },
  },
  avatar: {
    type: String,
    default: './images/avatar_default.jpg',
    trim: true,
    validate: (value: string) => {
      if (!validator.isURL(value) && value !== './images/avatar_default.jpg') {
        throw new Error('Avatar must be a valid URL');
      }
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw new Error('Email not valid');
      }
    },
  },
  password: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (
        !validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })
      ) {
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

export const User = model<UserDocumentInterface>('User', UserSchema);
