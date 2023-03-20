import { useForm } from 'react-hook-form';
import validator from 'validator';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { RegisterFormInputs, RegisterOptions } from 'auth-types';

interface RegisterFormProps {
  error: string | null;
  onSubmit: (data: RegisterOptions) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  error,
}) => {
  const [showMore, setShowMore] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<RegisterFormInputs>();

  const submitHandler = (data: RegisterFormInputs) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, showPassword, ...credentials } = data;
    onSubmit(credentials);
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Card style={styles.form__card} testid='form-card'>
      <div className={styles.form__container}>
        <Title style={styles.title}>Register</Title>
        <form
          className={styles.form}
          onSubmit={handleSubmit(submitHandler)}
          data-testid='register-form'
        >
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('username') ? watch('username') : ''}
              className={styles.text__input}
              type='text'
              data-testid='username-input'
              {...register('username', {
                required: true,
                maxLength: 10,
              })}
            />
            <label className={styles.field__label}>
              <div className={styles.label__text}>Username</div>
            </label>
          </div>
          <div className={styles.errors}>
            {errors.username?.type === 'required' && (
              <p className={styles.error__msg} data-testid='alert'>
                Username is required
              </p>
            )}
            {errors.username?.type === 'maxLength' && (
              <p className={styles.error__msg} data-testid='alert'>
                Username must have less than 10 characters
              </p>
            )}
          </div>
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('email') ? watch('email') : ''}
              className={styles.text__input}
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
          <div className={styles.errors}>
            {errors.email && (
              <p className={styles.error__msg} data-testid='alert'>
                Email not valid
              </p>
            )}
          </div>
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('password') ? watch('password') : ''}
              className={styles.text__input}
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
          <div className={styles.errors}>
            {errors.password && (
              <>
                {showMore ? (
                  <p className={styles.error__msg} data-testid='alert'>
                    Password must be strong. At least eight characters, one
                    lowercase, one upercase and one number.
                    <a
                      className={styles.show__more}
                      onClick={handleShowMore}
                      data-testid='show-less'
                    >
                      <br />
                      Show less
                    </a>
                  </p>
                ) : (
                  <p className={styles.error__msg} data-testid='alert'>
                    Password must be strong. &nbsp;
                    <a
                      className={styles.show__more}
                      onClick={handleShowMore}
                      data-testid='show-more'
                    >
                      Show more
                    </a>
                  </p>
                )}
              </>
            )}
          </div>
          <div className={styles.field} data-testid='form-field'>
            <input
              value={watch('confirmPassword') ? watch('confirmPassword') : ''}
              className={styles.text__input}
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
          <div className={styles.errors}>
            {errors.confirmPassword && (
              <p className={styles.error__msg} data-testid='alert'>
                Different passwords
              </p>
            )}
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
          <Button testid='submit-button' submit>
            register
          </Button>
        </form>
      </div>
    </Card>
  );
};
