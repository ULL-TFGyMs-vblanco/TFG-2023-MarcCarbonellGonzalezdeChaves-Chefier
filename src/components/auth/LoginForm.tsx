import { useForm } from 'react-hook-form';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { LoginFormInputs } from 'auth-types';
import { signIn, SignInOptions } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

interface LoginFormProps {
  error: string | null;
  onSubmit: (data: SignInOptions) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const { register, watch, handleSubmit, reset } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (data: LoginFormInputs) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { showPassword, ...credentials } = data;
    onSubmit(credentials);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Card style={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <Title style={styles.title}>Log In</Title>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
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
                {...register('showPassword')}
                data-testid='checkbox'
                onClick={togglePasswordVisibility}
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
        <div className={styles.oauth}>
          <Button
            style={styles.google__button}
            onClick={() => signIn('google', { callbackUrl: '/' })}
          >
            <FcGoogle />
            <span>&nbsp; Log in with Google</span>
          </Button>
          <Button
            style={styles.github__button}
            onClick={() => signIn('github', { callbackUrl: '/' })}
          >
            <FaGithub color='white' />
            <span>&nbsp; Log in with GitHub</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
