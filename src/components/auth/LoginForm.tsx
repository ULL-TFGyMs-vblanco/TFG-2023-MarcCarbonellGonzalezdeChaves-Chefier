import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { LoginData, LoginFormInputs } from 'auth-types';
import { SignInOptions } from 'next-auth/react';
import { useTheme } from '@nextui-org/react';
import styles from 'src/styles/auth/AuthForm.module.css';
import { useShow } from 'src/hooks/useShow';
import OauthLogin from './OauthLogin';

interface LoginFormProps {
  onLogin: (provider: string, options: SignInOptions) => void | Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { isDark } = useTheme();
  const { register, watch, handleSubmit } = useForm<LoginFormInputs>();
  const { show: showPassword, toggleShow: toggleShowPassword } = useShow();

  const loginHandler = (provider: string, credentials?: LoginData) => {
    if (credentials) {
      onLogin(provider, { ...credentials, callbackUrl: '/' });
    } else {
      onLogin(provider, { callbackUrl: '/' });
    }
  };

  const submitHandler = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordVisibility, ...credentials } = data;
    loginHandler('credentials', credentials);
  };

  return (
    <Card style={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <Image
          src={`/images/chefier${isDark ? '-dark' : ''}.png`}
          alt='logo'
          width={100}
          height={100}
          priority
        />
        <Title style={styles.title}>Inicia sesión en Chefier</Title>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
          data-testid='login-form'
        >
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('email') ? watch('email') : ''}
              className={styles.input__style}
              type='text'
              data-testid='email-input'
              {...register('email')}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Correo&nbsp;electrónico</div>
            </label>
          </div>
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('password') ? watch('password') : ''}
              className={styles.input__style}
              type={showPassword ? 'text' : 'password'}
              data-testid='password-input'
              {...register('password')}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Contraseña</div>
            </label>
          </div>
          <div className={styles.show__password} data-testid='form-checkbox'>
            <div className={styles.checkbox__container}>
              <input
                className={styles.checkbox}
                type='checkbox'
                {...register('passwordVisibility')}
                data-testid='checkbox'
                onClick={toggleShowPassword}
              />
            </div>
            <span className={styles.checkbox__text}>
              mostrar&nbsp;contraseña
            </span>
          </div>
          <Button
            style={styles.credentials__button}
            testid='submit-button'
            submit
          >
            <span>Iniciar sesión</span>
          </Button>
        </form>
        <div className={styles.divider}>
          <span className={styles.divider__text}>o</span>
        </div>
        <OauthLogin onLogin={loginHandler} />
        <p className={styles.session__msg}>
          ¿Todavía&nbsp;no&nbsp;tienes&nbsp;una&nbsp;cuenta?&nbsp;
          <Link className={styles.session__link} href='/auth/register'>
            Regístrate
          </Link>
        </p>
      </div>
    </Card>
  );
};
