import { LoginForm } from '../../components/auth/LoginForm';
import UserService from '../../services/UserService';
import { SignInOptions } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CustomModal } from '../../components/ui/CustomModal';
import { useRouter } from 'next/router';

// Login page
const Login: React.FC = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.error !== undefined) {
      setError(router.query.error as string);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [router.query.error]);

  // Function to handle the login
  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await UserService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  // Function to handle modal cloing
  const closeModalHandler = async () => {
    await router.push('/auth/login');
  };

  return (
    <div>
      <LoginForm onLogin={loginHandler} />
      <CustomModal
        type='error'
        title='Error'
        visible={visible}
        handler={setVisible}
        onClose={closeModalHandler}
      >
        {error === 'sessionExpired'
          ? `Tu sesión ha expirado. Por favor, inicia sesión de nuevo.`
          : `Oops! Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo más tarde.`}
      </CustomModal>
    </div>
  );
};

export default Login;
