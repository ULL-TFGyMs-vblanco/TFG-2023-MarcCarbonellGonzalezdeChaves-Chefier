import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/Button';
import styles from 'src/styles/auth/OauthLogin.module.css';

interface OauthLoginProps {
  onLogin: (provider: string) => void;
}

export const OauthLogin: React.FC<OauthLoginProps> = ({ onLogin }) => {
  return (
    <div className={styles.oauth}>
      <Button
        style={styles.google__button}
        onClick={() => onLogin('google')}
        testid='google-login'
      >
        <FcGoogle />
        <span>&nbsp;Iniciar&nbsp;sesión&nbsp;con&nbsp;Google</span>
      </Button>
      <Button
        style={styles.github__button}
        onClick={() => onLogin('github')}
        testid='github-login'
      >
        <FaGithub color='white' />
        <span>&nbsp;Iniciar&nbsp;sesión&nbsp;con&nbsp;GitHub</span>
      </Button>
    </div>
  );
};

export default OauthLogin;
