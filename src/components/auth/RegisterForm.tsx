import validator from 'validator';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@nextui-org/react';
import { SignInOptions } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import styles from 'src/styles/auth/AuthForm.module.css';
import { RegisterFormInputs, RegisterData } from 'auth-types';
import useShow from 'src/hooks/useShow';
import OauthLogin from './OauthLogin';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<boolean>;
  onOauthLogin: (provider: string, options: SignInOptions) => void;
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
  const [showMore, toggleShowMore] = useShow();
  const [showPassword, toggleShowPassword] = useShow();

  const loginHandler = (provider: string) => {
    onOauthLogin(provider, { callbackUrl: '/' });
  };

  const registerHandler = (credentials: RegisterData) => {
    onRegister(credentials).then((res) => {
      if (res) {
        toggleModal(true);
      }
    });
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
        <Title style={styles.title}>Join Chefier</Title>
        <form
          autoComplete='off'
          className={styles.form}
          onSubmit={handleSubmit(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ confirmPassword, passwordVisibility, ...credentials }) =>
              registerHandler(credentials)
          )}
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
              <div className={styles.label__text}>Username</div>
            </label>
          </div>
          {errors.username?.type === 'required' && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Username is required
              </p>
            </div>
          )}
          {errors.username?.type === 'maxLength' && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Username must have at most 20 characters
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
              <div className={styles.label__text}>Email</div>
            </label>
          </div>
          {errors.email && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Email not valid
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
              <div className={styles.label__text}>Password</div>
            </label>
          </div>
          {errors.password && (
            <>
              {showMore ? (
                <div className={styles.errors}>
                  <p className={styles.error__msg} data-testid='alert'>
                    Password must be strong. At least eight characters, one
                    lowercase, one upercase and one number.&nbsp;
                    <a
                      className={styles.show__more}
                      onClick={toggleShowMore}
                      data-testid='show-less'
                    >
                      Show less
                    </a>
                  </p>
                </div>
              ) : (
                <div className={styles.errors}>
                  <p className={styles.error__msg} data-testid='alert'>
                    Password must be strong.&nbsp;
                    <a
                      className={styles.show__more}
                      onClick={toggleShowMore}
                      data-testid='show-more'
                    >
                      Show more
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
              <div className={styles.label__text}>Confirm password</div>
            </label>
          </div>
          {errors.confirmPassword && (
            <div className={styles.errors}>
              <p className={styles.error__msg} data-testid='alert'>
                Different passwords
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
            <span className={styles.checkbox__text}>show password</span>
          </div>
          <Button
            style={styles.credentials__button}
            testid='submit-button'
            submit
          >
            Register
          </Button>
        </form>
        <div className={styles.divider}>
          <span className={styles.divider__text}>or</span>
        </div>
        <OauthLogin onLogin={loginHandler} />
        <p className={styles.session__msg}>
          Already have an account?&nbsp;
          <Link className={styles.session__link} href='/auth/login'>
            Log in
          </Link>
        </p>
      </div>
    </Card>
  );
};
