import { LoginForm } from '@/components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default Login;
