import useSWRMutation from 'swr/mutation';

import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterData } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { SignInOptions } from 'next-auth/react';

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { trigger } = useSWRMutation(
    '/api/auth/register',
    AuthService.register
  );

  const registerHandler = async (data: RegisterData) => {
    try {
      await trigger(data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await AuthService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <RegisterForm
        onRegister={registerHandler}
        onOauthLogin={loginHandler}
        error={error}
      />
    </div>
  );
};

export default Register;
