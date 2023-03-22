import useSWRMutation from 'swr/mutation';

import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterData } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { SignInOptions } from 'next-auth/react';

const Register: React.FC = () => {
  const [serror, setError] = useState<string | null>(null);
  const { trigger } = useSWRMutation(
    '/api/auth/register',
    AuthService.register
  );

  const registerHandler = async (data: RegisterData) => {
    try {
      await trigger(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await AuthService.login(provider, data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <RegisterForm
        onRegister={registerHandler}
        onLogin={loginHandler}
        error={serror}
      />
    </div>
  );
};

export default Register;
