import { RegisterOptions } from 'auth-types';
import axios from 'axios';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: async (url: string, { arg }: { arg: RegisterOptions }) => {
    const res = await axios.post(url, arg);
    if (res.status === 400) {
      throw new Error(res.data.error);
    } else if (res.status === 200) {
      console.log(res.data.user);
      return res.data.user;
    }
  },
  login: async (data: SignInOptions) => {
    const res = await signIn('credentials', { ...data, redirect: false });
    console.log(res);
    return res;
  },
};

export default AuthService;
