import { RegisterData } from 'auth-types';
import axios, { AxiosError } from 'axios';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: async (url: string, arg: { arg: RegisterData }) => {
    try {
      await axios.post(url, arg);
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(error.message);
    }
  },
  login: async (provider: string, options: SignInOptions) => {
    await signIn(provider, { ...options, redirect: false }).then((res) => {
      if (res !== undefined) {
        throw new Error(res?.error);
      }
    });
  },
};

export default AuthService;
