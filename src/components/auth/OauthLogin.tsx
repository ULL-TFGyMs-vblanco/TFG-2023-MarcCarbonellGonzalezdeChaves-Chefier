import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/Button';
import styles from 'src/styles/auth/OauthLogin.module.css';
import { LoginData } from 'user-types';
import { Loading } from '@nextui-org/react';

// Props for the OauthLogin component
interface OauthLoginProps {
  onLogin: (provider: string, credentials?: LoginData) => Promise<void>;
}

// Oauth login buttons component
export const OauthLogin: React.FC<OauthLoginProps> = ({ onLogin }) => {
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [isLoggingInGithub, setIsLoggingInGithub] = useState(false);

  // Function to handle login
  const loginHandler = async (provider: string) => {
    if (provider === 'google') {
      setIsLoggingInGoogle(true);
    } else {
      setIsLoggingInGithub(true);
    }
    await onLogin(provider);
    if (provider === 'google') {
      setIsLoggingInGoogle(false);
    } else {
      setIsLoggingInGithub(false);
    }
  };

  return (
    <div className={styles.oauth}>
      <Button
        className={styles.google__button}
        onClick={() => loginHandler('google')}
        testid='google-login'
      >
        {isLoggingInGoogle ? (
          <Loading />
        ) : (
          <>
            <FcGoogle />
            <span>&nbsp;Iniciar sesión con Google</span>
          </>
        )}
      </Button>
      <Button
        className={styles.github__button}
        onClick={() => loginHandler('github')}
        testid='github-login'
      >
        {' '}
        {isLoggingInGithub ? (
          <Loading />
        ) : (
          <>
            <FaGithub color='white' />
            <span>&nbsp;Iniciar sesión con GitHub</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default OauthLogin;
