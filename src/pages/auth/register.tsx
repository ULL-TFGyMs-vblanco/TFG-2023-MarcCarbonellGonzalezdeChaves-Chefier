import useSWRMutation from 'swr/mutation';
import { CustomModal } from '../../components/ui/CustomModal';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { RegisterData } from 'auth-types';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { useEffect, useState } from 'react';
import { SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [error, setError] = useState<string | string[]>();
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const router = useRouter();
  const { trigger } = useSWRMutation('/auth/register', AuthService.register);

  useEffect(() => {
    error ? setErrorModal(true) : setErrorModal(false);
  }, [error]);

  const registerHandler = async (data: RegisterData) => {
    try {
      await trigger(data);
      return true;
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
      return false;
    }
  };

  const loginHandler = async (provider: string, data: SignInOptions) => {
    try {
      await AuthService.login(provider, data);
    } catch (error) {
      const errorMessage = (error as Error).toString();
      setError(errorMessage);
    }
  };

  const closeSuccessModalHandler = async () => {
    router.push('/auth/login');
  };

  const closeErrorModalHandler = async () => {
    setError(undefined);
  };

  return (
    <div className={styles.container}>
      <RegisterForm
        onRegister={registerHandler}
        onOauthLogin={loginHandler}
        toggleModal={setSuccesModal}
      />
      <CustomModal
        type='success'
        title='SUCCESS'
        visible={successModal}
        handler={setSuccesModal}
        onClose={closeSuccessModalHandler}
      >
        Congratulations, your account has been successfully created!
      </CustomModal>
      <CustomModal
        type='error'
        title='Error'
        visible={errorModal}
        handler={setErrorModal}
        onClose={closeErrorModalHandler}
      >
        {`${error}`}
      </CustomModal>
    </div>
  );
};

export default Register;
