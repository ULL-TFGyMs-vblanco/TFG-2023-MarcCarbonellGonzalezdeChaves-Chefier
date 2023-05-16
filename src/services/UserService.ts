import { RegisterData, ValidUpdate } from 'user-types';
import axios from '../../axios_config';
import { getSession, signIn, SignInOptions, signOut } from 'next-auth/react';

const UserService = {
  register: async (url: string, data: RegisterData) => {
    try {
      await axios.post(url, data);
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

  updateUser: async (url: string, update: ValidUpdate) => {
    const session = await getSession();
    try {
      await axios.patch(
        url,
        { update },
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            Provider: session?.user.provider as string,
          },
        }
      );
    } catch (err: any) {
      if (err.response.status === 401) {
        await signOut();
        throw new Error('Session expired');
      } else {
        throw new Error(err.response.data.error.message);
      }
    }
  },
};

export default UserService;
