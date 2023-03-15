import { RegisterForm } from '@/components/auth/RegisterForm';
import styles from 'src/styles/auth/Auth.module.css';

const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default Register;
