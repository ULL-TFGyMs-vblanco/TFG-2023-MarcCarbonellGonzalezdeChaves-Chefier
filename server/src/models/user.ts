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
      if (validator.isLength(value, { max: 10 })) {
        throw new Error('Username must be less than 10 characters');
      }
    },
  },
  nickname: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (validator.isLength(value, { max: 10 })) {
        throw new Error('Nickname must be less than 10 characters');
      }
    },
  },
  description: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (validator.isLength(value, { max: 100 })) {
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
    trim: true,
    validate: (value: string) => {
      if (!validator.isURL(value)) {
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
    required: true,
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
