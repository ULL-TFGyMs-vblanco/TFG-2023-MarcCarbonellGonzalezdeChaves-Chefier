import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions } from 'next-auth/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (data: SignInOptions) => {
    try {
      await AuthService.login(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <LoginForm onSubmit={submitHandler} error={error} />
    </div>
  );
};

export default Login;
