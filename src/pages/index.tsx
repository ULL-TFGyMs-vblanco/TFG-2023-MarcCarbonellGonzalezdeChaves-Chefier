import { Button } from '../components/ui/Button';
import Link from 'next/link';
import styles from 'src/styles/home/Home.module.css';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <h1>Chefier</h1>
      <Button testid='register-button'>
        <Link href='/auth/register'>Register</Link>
      </Button>
      {session && (
        <Button onClick={() => signOut()}>
          <span>Log out</span>
        </Button>
      )}
    </div>
  );
}
