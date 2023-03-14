import { useForm } from 'react-hook-form';
import validator from 'validator';
import styles from 'src/styles/register/RegisterForm.module.css';

interface FormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
}

export const RegisterForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  const showPassword = watch('showPassword');

  return (
    <div className={styles.form__container}>
      <p className={styles.title}>Register</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label style={{ display: 'block' }}>Username</label>
          <input
            type='text'
            {...register('username', {
              required: true,
              maxLength: 10,
            })}
          />
          {errors.username?.type === 'required' && <p>Username is required</p>}
          {errors.username?.type === 'maxLength' && (
            <p>Username must have less than 10 characters</p>
          )}
        </div>
        <div>
          <label style={{ display: 'block' }}>Email</label>
          <input
            type='text'
            {...register('email', {
              validate: (value) => validator.isEmail(value),
            })}
          />
          {errors.email?.type === 'required' && <p>Email is required</p>}
          {errors.email && <p>Email not valid</p>}
        </div>
        <div>
          <label style={{ display: 'block' }}>Password</label>
          <input
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
          {errors.email?.type === 'required' && <p>Password is required</p>}
          {errors.password && (
            <p>
              Password must be strong. (At least eight characters, one
              lowercase, one upercase and one number)
            </p>
          )}
        </div>
        <div>
          <label style={{ display: 'block' }}>Confirm password</label>
          <input
            type={showPassword ? 'type' : 'password'}
            {...register('confirmPassword', {
              validate: (value) => validator.equals(value, watch('password')),
            })}
          />
          {errors.email?.type === 'required' && <p>Password is required</p>}
          {errors.confirmPassword && <p>Different passwords</p>}
        </div>
        <div>
          <input type='checkbox' {...register('showPassword')} />
          <label>show password</label>
        </div>
        <input type='submit' value='Enviar' />
      </form>
    </div>
  );
};
