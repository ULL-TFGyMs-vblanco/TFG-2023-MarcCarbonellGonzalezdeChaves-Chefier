import { CustomModal } from '../../components/ui/CustomModal';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterData } from 'user-types';
import UserService from '../../services/UserService';
import { useEffect, useState } from 'react';
import { SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [error, setError] = useState<string | string[]>();
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    error ? setErrorModal(true) : setErrorModal(false);
  }, [error]);

  const registerHandler = async (data: RegisterData) => {
    try {
      await UserService.register('/auth/register', data);
      return true;
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
      return false;
    }
  };

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await UserService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  const closeSuccessModalHandler = async () => {
    await router.push('/auth/login');
  };

  const closeErrorModalHandler = async () => {
    setError(undefined);
  };

  return (
    <div>
      <RegisterForm
        onRegister={registerHandler}
        onOauthLogin={loginHandler}
        toggleModal={setSuccesModal}
      />
      <CustomModal
        type='success'
        title='¡Listo!'
        visible={successModal}
        handler={setSuccesModal}
        onClose={closeSuccessModalHandler}
      >
        Felicidades, tu cuenta ha sido creada con éxito!
      </CustomModal>
      <CustomModal
        type='error'
        title='Error'
        visible={errorModal}
        handler={setErrorModal}
        onClose={closeErrorModalHandler}
      >
        Oops! Ha ocurrido un error al crear tu cuenta. Inténtalo de nuevo más
        tarde.
      </CustomModal>
    </div>
  );
};

export default Register;
