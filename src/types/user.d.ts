// User types
declare module 'user-types' {
  // Login form inputs
  export interface LoginFormInputs {
    email: string;
    password: string;
    passwordVisibility: boolean;
  }

  // Login data to send to the API
  export interface LoginData {
    email: string;
    password: string;
  }

  // Register form inputs
  interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordVisibility: boolean;
  }

  // Register data to send to the API
  interface RegisterData {
    username: string;
    email: string;
    password?: string;
    image?: string;
  }

  // User data returned by the API
  interface User {
    _id: string;
    username: string;
    nickname?: string;
    description: string;
    registerDate: Date;
    birthdate?: Date;
    image: string;
    email: string;
    password: string;
    saved: string[];
    likes: string[];
    recipes: string[];
    following: string[];
    followers: string[];
  }

  // Valid user fields to updated
  interface ValidUpdate {
    $push?: {
      saved?: string;
      likes?: string;
      recipes?: string;
      following?: string;
      followers?: string;
    };
    $pull?: {
      saved?: string;
      likes?: string;
      recipes?: string;
      following?: string;
      followers?: string;
    };
    saved?: string[];
    likes?: string[];
    recipes?: string[];
    following?: string[];
    followers?: string[];
  }
}
