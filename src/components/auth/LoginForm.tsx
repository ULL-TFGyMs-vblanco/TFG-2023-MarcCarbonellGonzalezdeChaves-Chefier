import { useForm } from 'react-hook-form';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from '../ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { LoginFormInputs } from '@/types/forms';

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { register, watch, handleSubmit, reset } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (data: LoginFormInputs) => {
    onSubmit(data);
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
          <Button testid='submit-button' submit>
            Log in
          </Button>
        </form>
      </div>
    </Card>
  );
};
