import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterFormInputs } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';

const Register: React.FC = () => {
  const submitHandler = (data: RegisterFormInputs) => {
    AuthService.register(data);
  };
  return (
    <div className={styles.container}>
      <RegisterForm onSubmit={submitHandler} />
    </div>
  );
};

export default Register;
