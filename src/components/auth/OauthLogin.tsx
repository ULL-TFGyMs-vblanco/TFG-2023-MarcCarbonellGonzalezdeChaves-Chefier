import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/Button';
import styles from 'src/styles/auth/OauthLogin.module.css';
import { LoginData } from 'auth-types';
import { Loading } from '@nextui-org/react';

interface OauthLoginProps {
  onLogin: (provider: string, credentials?: LoginData) => Promise<void>;
}

export const OauthLogin: React.FC<OauthLoginProps> = ({ onLogin }) => {
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [isLoggingInGithub, setIsLoggingInGithub] = useState(false);

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
        style={styles.google__button}
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
        style={styles.github__button}
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
