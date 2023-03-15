import { useForm } from 'react-hook-form';
import styles from 'src/styles/auth/AuthForm.module.css';
import { Card } from 'src/components/ui/Card';
import { Title } from '../ui/Title';
import { Button } from '../ui/Button';

interface FormInputs {
  email: string;
  password: string;
  showPassword: boolean;
}

export const LoginForm: React.FC = () => {
  const { register, watch, handleSubmit } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const showPassword = watch('showPassword');

  return (
    <Card>
      <div className={styles.form__container}>
        <Title style={styles.title}>Login</Title>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label className={styles.field__label}>Email</label>
            <input
              className={styles.text__input}
              type='text'
              {...register('email')}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.field__label}>Password</label>
            <input
              className={styles.text__input}
              type={showPassword ? 'type' : 'password'}
              {...register('password')}
            />
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
          <Button submit>Log in</Button>
        </form>
      </div>
    </Card>
  );
};
