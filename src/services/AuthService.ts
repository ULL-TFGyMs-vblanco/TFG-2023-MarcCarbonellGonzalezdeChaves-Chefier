import { RegisterOptions } from 'auth-types';
import axios from 'axios';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: async (url: string, { arg }: { arg: RegisterOptions }) => {
    const res = await axios.post(url, arg);
    if (res.status === 400) {
      throw new Error(res.data.error);
    } else {
      return res.data.user;
    }
  },
  login: async (data: SignInOptions) => {
    await signIn('credentials', { ...data, redirect: false });
  },
};

export default AuthService;
