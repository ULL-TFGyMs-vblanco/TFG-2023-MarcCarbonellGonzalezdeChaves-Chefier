import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions } from 'next-auth/react';

const Login: React.FC = () => {
  const submitHandler = (data: SignInOptions) => {
    AuthService.login(data);
  };
  return (
    <div className={styles.container}>
      <LoginForm onSubmit={submitHandler} />
    </div>
  );
};

export default Login;
