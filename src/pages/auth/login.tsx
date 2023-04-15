import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CustomModal } from '../../components/ui/CustomModal';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(router.query.error !== undefined);
  }, [router.query.error]);

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await AuthService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  const closeModalHandler = async () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <LoginForm onLogin={loginHandler} error={error} />
      <CustomModal
        type='error'
        title='Error'
        visible={visible}
        handler={setVisible}
        onClose={closeModalHandler}
      >
        Oops! An error occurred while logging in. Please try again later.
      </CustomModal>
    </div>
  );
};

export default Login;
