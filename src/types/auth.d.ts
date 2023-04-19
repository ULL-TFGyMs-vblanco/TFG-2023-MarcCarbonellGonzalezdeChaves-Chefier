declare module 'auth-types' {
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
}
