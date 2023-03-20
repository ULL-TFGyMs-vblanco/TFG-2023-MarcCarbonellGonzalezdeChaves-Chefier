import { LoginForm } from '../../components/auth/LoginForm';
import styles from 'src/styles/auth/Auth.module.css';
import AuthService from '../../services/AuthService';
import { SignInOptions, useSession } from 'next-auth/react';

const Login: React.FC = () => {
  const { data } = useSession();

  const submitHandler = async (data: SignInOptions) => {
    try {
      const result = await AuthService.login(data);
      console.log(result);
    } catch (e) {
      // error handling
    }
  };
  return (
    <div className={styles.container}>
      {data?.user && <p>{data.user.name}</p>}
      <LoginForm onSubmit={submitHandler} />
      {/* <button onClick={() => signOut}>sign out</button> */}
    </div>
  );
};

export default Login;
