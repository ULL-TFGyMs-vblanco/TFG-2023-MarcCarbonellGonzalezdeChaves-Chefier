import { useForm } from 'react-hook-form';
import validator from 'validator';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from 'src/components/ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useState } from 'react';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

export const RegisterForm: React.FC = () => {
  const [showMore, setShowMore] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const showPassword = watch('showPassword');

  return (
    <Card style={styles.form__card}>
      <div className={styles.form__container}>
        <Title style={styles.title}>Register</Title>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <input
              value={watch('username') ? watch('username') : ''}
              className={styles.text__input}
              type='text'
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
              <p className={styles.error__msg}>Username is required</p>
            )}
            {errors.username?.type === 'maxLength' && (
              <p className={styles.error__msg}>
                Username must have less than 10 characters
              </p>
            )}
          </div>
          <div className={styles.field}>
            <input
              value={watch('email') ? watch('email') : ''}
              className={styles.text__input}
              type='text'
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
              <p className={styles.error__msg}>Email not valid</p>
            )}
          </div>
          <div className={styles.field}>
            <input
              value={watch('password') ? watch('password') : ''}
              className={styles.text__input}
              type={showPassword ? 'type' : 'password'}
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
                  <p className={styles.error__msg}>
                    Password must be strong. At least eight characters, one
                    lowercase, one upercase and one number.
                    <a className={styles.show__more} onClick={handleShowMore}>
                      <br />
                      Show less
                    </a>
                  </p>
                ) : (
                  <p className={styles.error__msg}>
                    Password must be strong. &nbsp;
                    <a className={styles.show__more} onClick={handleShowMore}>
                      Show more
                    </a>
                  </p>
                )}
              </>
            )}
          </div>
          <div className={styles.field}>
            <input
              value={watch('confirmPassword') ? watch('confirmPassword') : ''}
              className={styles.text__input}
              type={showPassword ? 'type' : 'password'}
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
              <p className={styles.error__msg}>Different passwords</p>
            )}
          </div>
          <div className={styles.checkbox__container}>
            <label>
              <input
                className={styles.checkbox}
                type='checkbox'
                {...register('showPassword')}
              />
              show password
            </label>
          </div>
          <Button submit>Register</Button>
        </form>
      </div>
    </Card>
  );
};
