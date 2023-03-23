import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions } from 'next-auth/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

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
      <LoginForm onLogin={loginHandler} error={error} />
    </div>
  );
};

export default Login;
