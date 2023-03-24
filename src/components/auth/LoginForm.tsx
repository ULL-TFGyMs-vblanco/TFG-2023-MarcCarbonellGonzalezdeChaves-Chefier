import { useForm } from 'react-hook-form';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { LoginData, LoginFormInputs } from 'auth-types';
import { SignInOptions } from 'next-auth/react';
import useShow from 'src/hooks/useShow';
import Link from 'next/link';
import OauthLogin from './OauthLogin';

interface LoginFormProps {
  onLogin: (provider: string, options: SignInOptions) => void;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const { register, watch, handleSubmit } = useForm<LoginFormInputs>();
  const [showPassword, toggleShowPassword] = useShow();

  const loginHandler = (provider: string, credentials?: LoginData) => {
    if (credentials) {
      onLogin(provider, { ...credentials, callbackUrl: '/' });
    } else {
      onLogin(provider, { callbackUrl: '/' });
    }
  };

  return (
    <Card style={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <Title style={styles.title}>Log In</Title>
        <form
          autoComplete='off'
          className={styles.form}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onSubmit={handleSubmit(({ passwordVisibility, ...credentials }) =>
            loginHandler('credentials', credentials)
          )}
          data-testid='login-form'
        >
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('email') ? watch('email') : ''}
              className={styles.text__input}
              type='text'
              data-testid='email-input'
              {...register('email')}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Email</div>
            </label>
          </div>
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('password') ? watch('password') : ''}
              className={styles.text__input}
              type={showPassword ? 'text' : 'password'}
              data-testid='password-input'
              {...register('password')}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Password</div>
            </label>
          </div>
          <div
            className={styles.checkbox__container}
            data-testid='form-checkbox'
          >
            <label>
              <input
                className={styles.checkbox}
                type='checkbox'
                {...register('passwordVisibility')}
                data-testid='checkbox'
                onClick={toggleShowPassword}
              />
              show password
            </label>
          </div>
          {error && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                {error}
              </p>
            </div>
          )}
          <Button
            style={styles.credentials__button}
            testid='submit-button'
            submit
          >
            <span>Log in</span>
          </Button>
        </form>
        <div className={styles.separator}>
          <span className={styles.separator__text}>or</span>
        </div>
        <OauthLogin onLogin={loginHandler} />
        <p className={styles.session__msg}>
          Don&apos;t have an account yet?&nbsp;
          <Link className={styles.session__link} href='/auth/register'>
            Register
          </Link>
        </p>
      </div>
    </Card>
  );
};
