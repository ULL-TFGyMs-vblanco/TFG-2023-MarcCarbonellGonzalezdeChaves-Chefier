import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions } from 'next-auth/react';

const Login: React.FC = () => {
  const submitHandler = async (data: SignInOptions) => {
    try {
      const result = await AuthService.login(data);
      console.log(result);
    } catch (e) {
      // error handling
    }
  };
  return (
    <div className={styles.container}>
      <LoginForm onSubmit={submitHandler} />
    </div>
  );
};

export default Login;
