import useSWRMutation from 'swr/mutation';

import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterOptions } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';

const Register: React.FC = () => {
  const { trigger } = useSWRMutation(
    '/api/auth/register',
    AuthService.register
  );

  const submitHandler = async (data: RegisterOptions) => {
    try {
      await trigger(data);
    } catch (e) {
      // error handling
    }
  };
  return (
    <div className={styles.container}>
      <RegisterForm onSubmit={submitHandler} />
    </div>
  );
};

export default Register;
