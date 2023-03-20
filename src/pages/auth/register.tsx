import useSWRMutation from 'swr/mutation';

import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterOptions } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { useState } from 'react';

const Register: React.FC = () => {
  const [serror, setError] = useState<string | null>(null);
  const { trigger } = useSWRMutation(
    '/api/auth/register',
    AuthService.register
  );

  const submitHandler = async (data: RegisterOptions) => {
    try {
      await trigger(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <RegisterForm onSubmit={submitHandler} error={serror} />
    </div>
  );
};

export default Register;
