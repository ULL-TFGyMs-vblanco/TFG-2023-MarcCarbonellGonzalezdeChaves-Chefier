declare module 'auth-types' {
  export interface LoginFormInputs {
    email: string;
    password: string;
    showPassword: boolean;
  }

  interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
  }

  interface RegisterOptions {
    username: string;
    email: string;
    password: string;
  }
}
