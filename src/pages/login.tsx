import { LoginForm } from '../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import { LoginFormInputs } from '@/types/forms';
import auth from 'src/services/auth';

const Login: React.FC = () => {
  const submitHandler = (data: LoginFormInputs) => {
    auth.login(data);
  };
  return (
    <div className={styles.container}>
      <LoginForm onSubmit={submitHandler} />
    </div>
  );
};

export default Login;
