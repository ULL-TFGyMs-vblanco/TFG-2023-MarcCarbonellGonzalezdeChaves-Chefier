import { RegisterData } from 'auth-types';
import axios from '../../axios_config';
import { signIn, SignInOptions } from 'next-auth/react';

const AuthService = {
  register: async (url: string, data: { arg: RegisterData }) => {
    try {
      await axios.post(url, data.arg);
    } catch (err: any) {
      const error = err.response.data.error;
      let errorMessage = error.message;
      if (error.errors) {
        error.errors.forEach((e: any) => {
          errorMessage = errorMessage.concat('\n', e.message);
        });
      }
      throw new Error(errorMessage);
    }
  },
  login: async (provider: string, options: SignInOptions) => {
    await signIn(provider, { ...options }).then((res) => {
      if (res?.error) {
        throw new Error(res?.error.toString());
      }
    });
  },
};

export default AuthService;
