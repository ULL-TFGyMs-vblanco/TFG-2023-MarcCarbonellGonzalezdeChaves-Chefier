import { RegisterForm } from '../components/auth/RegisterForm';
import { RegisterFormInputs } from 'src/types/forms';
import styles from 'src/styles/auth/Auth.module.css';
import auth from 'src/services/auth';

const Register: React.FC = () => {
  const submitHandler = (data: RegisterFormInputs) => {
    auth.register(data);
  };
  return (
    <div className={styles.container}>
      <RegisterForm onSubmit={submitHandler} />
    </div>
  );
};

export default Register;
