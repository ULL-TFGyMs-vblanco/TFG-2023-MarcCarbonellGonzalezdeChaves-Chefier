declare module 'user-types' {
  export interface LoginFormInputs {
    email: string;
    password: string;
    passwordVisibility: boolean;
  }

  export interface LoginData {
    email: string;
    password: string;
  }

  interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    passwordVisibility: boolean;
  }

  interface RegisterData {
    username: string;
    email: string;
    password?: string;
    image?: string;
  }

  interface User {
    _id: string;
    username: string;
    nickname: string;
    description: string;
    registerDate: Date;
    birthdate: Date;
    image: string;
    email: string;
    password: string;
    saved: string[];
    likes: string[];
    recipes: string[];
    following: string[];
    followers: string[];
  }

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
