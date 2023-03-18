import { RegisterFormInputs } from 'auth-types';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: (data: RegisterFormInputs) => {
    console.log(data);
  },
  login: (data: SignInOptions) => {
    signIn('credentials', { ...data, redirect: false });
    console.log(data);
  },
};

export default AuthService;
