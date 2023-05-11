import { LoginForm } from '../../components/auth/LoginForm';
import UserService from '../../services/UserService';
import { SignInOptions } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CustomModal } from '../../components/ui/CustomModal';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [error, setError] = useState<string | string[]>();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (router.query.error !== undefined) {
      setError(router.query.error);
      setVisible(router.query.error !== undefined);
    } else {
      setVisible(false);
    }
  }, [router.query.error]);

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await UserService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

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
        {`Error: ${error}`}
      </CustomModal>
    </div>
  );
};

export default Login;
