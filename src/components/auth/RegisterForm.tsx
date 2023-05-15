import validator from 'validator';
import Link from 'next/link';
import Image from 'next/image';
import { Loading, useTheme } from '@nextui-org/react';
import { SignInOptions } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import styles from 'src/styles/auth/AuthForm.module.css';
import { RegisterFormInputs, RegisterData } from 'user-types';
import { useShow } from 'src/hooks/useShow';
import OauthLogin from './OauthLogin';
import { useState } from 'react';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<boolean>;
  onOauthLogin: (
    provider: string,
    options: SignInOptions
  ) => void | Promise<void>;
  toggleModal: (visible: boolean) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegister,
  onOauthLogin,
  toggleModal,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterFormInputs>();
  const { isDark } = useTheme();
  const { show: showMore, toggleShow: toggleShowMore } = useShow();
  const { show: showPassword, toggleShow: toggleShowPassword } = useShow();
  const [isRegistering, setIsRegistering] = useState(false);

  const loginHandler = async (provider: string) => {
    await onOauthLogin(provider, { callbackUrl: '/' });
  };

  const registerHandler = async (credentials: RegisterData) => {
    setIsRegistering(true);
    await onRegister(credentials).then((res) => {
      if (res) {
        setIsRegistering(false);
        toggleModal(true);
      }
    });
  };

  const submitHandler = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, passwordVisibility, ...credentials } = data;
    await registerHandler(credentials);
  };

  return (
    <Card className={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <Image
          src={`/images/chefier${isDark ? '-dark' : ''}.png`}
          alt='logo'
          width={100}
          height={100}
          priority
        />
        <Title className={styles.title}>Únete&nbsp;a&nbsp;Chefier</Title>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
          data-testid='register-form'
        >
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('username') ? watch('username') : ''}
              className={styles.input__style}
              type='text'
              data-testid='username-input'
              {...register('username', {
                required: true,
                maxLength: 20,
              })}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>
                Nombre&nbsp;de&nbsp;usuario
              </div>
            </label>
          </div>
          {errors.username?.type === 'required' && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                El&nbsp;nombre&nbsp;de&nbsp;usuario&nbsp;es&nbsp;obligatorio
              </p>
            </div>
          )}
          {errors.username?.type === 'maxLength' && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                El&nbsp;nombre&nbsp;de&nbsp;usuario&nbsp;debe&nbsp;tener&nbsp;como&nbsp;máximo&nbsp;20&nbsp;caracteres
              </p>
            </div>
          )}
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('email') ? watch('email') : ''}
              className={styles.input__style}
              type='text'
              data-testid='email-input'
              {...register('email', {
                validate: (value) => validator.isEmail(value),
              })}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Correo&nbsp;electrónico</div>
            </label>
          </div>
          {errors.email && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Correo&nbsp;electrónico&nbsp;no&nbsp;válido
              </p>
            </div>
          )}
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('password') ? watch('password') : ''}
              className={styles.input__style}
              type={showPassword ? 'text' : 'password'}
              data-testid='password-input'
              {...register('password', {
                validate: (value) =>
                  validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                  }),
              })}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Contraseña</div>
            </label>
          </div>
          {errors.password && (
            <>
              {showMore ? (
                <div className={styles.errors}>
                  <p className={styles.error__msg} data-testid='alert'>
                    La&nbsp;contraseña&nbsp;debe&nbsp;tener&nbsp;como&nbsp;mínimo&nbsp;8&nbsp;caracteres,&nbsp;una&nbsp;mayúscula,&nbsp;una&nbsp;minúscula&nbsp;y&nbsp;un&nbsp;número.&nbsp;
                    <a
                      className={styles.show__more}
                      onClick={toggleShowMore}
                      data-testid='show-less'
                    >
                      Mostrar&nbsp;menos
                    </a>
                  </p>
                </div>
              ) : (
                <div className={styles.errors}>
                  <p className={styles.error__msg} data-testid='alert'>
                    La&nbsp;contraseña&nbsp;debe&nbsp;ser&nbsp;fuerte.&nbsp;
                    <a
                      className={styles.show__more}
                      onClick={toggleShowMore}
                      data-testid='show-more'
                    >
                      Mostrar&nbsp;más
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('confirmPassword') ? watch('confirmPassword') : ''}
              className={styles.input__style}
              type={showPassword ? 'text' : 'password'}
              data-testid='confirm-password-input'
              {...register('confirmPassword', {
                validate: (value) => validator.equals(value, watch('password')),
              })}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>
                Confirmar&nbsp;contraseña
              </div>
            </label>
          </div>
          {errors.confirmPassword && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Contraseñas&nbsp;diferentes
              </p>
            </div>
          )}
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
            className={styles.credentials__button}
            testid='submit-button'
            submit
          >
            {isRegistering ? <Loading /> : <span>Registrarse</span>}
          </Button>
        </form>
        <div className={styles.divider}>
          <span className={styles.divider__text}>or</span>
        </div>
        <OauthLogin onLogin={loginHandler} />
        <p className={styles.session__msg}>
          ¿Ya&nbsp;tienes&nbsp;una&nbsp;cuenta?&nbsp;
          <Link className={styles.session__link} href='/auth/login'>
            Inicia&nbsp;sesión
          </Link>
        </p>
      </div>
    </Card>
  );
};
