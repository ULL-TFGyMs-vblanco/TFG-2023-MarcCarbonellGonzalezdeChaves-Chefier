import { RegisterData } from 'auth-types';
import axios from 'axios';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: async (url: string, { arg }: { arg: RegisterData }) => {
    try {
      const res = await axios.post(url, arg);
      return res.data.user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.data.error);
    }
  },
  login: async (provider: string, options: SignInOptions) => {
    await signIn(provider, { ...options });
  },
};

export default AuthService;
