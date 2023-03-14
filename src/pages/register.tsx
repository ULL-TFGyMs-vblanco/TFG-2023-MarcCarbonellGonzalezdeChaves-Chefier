import { RegisterForm } from 'src/components/register/RegisterForm';
import styles from 'src/styles/register/Register.module.css';

const Register: React.FC = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default Register;
