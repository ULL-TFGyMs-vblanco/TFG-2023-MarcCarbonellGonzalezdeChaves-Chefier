import { Button } from '../components/ui/Button';
import Link from 'next/link';
import styles from 'src/styles/Home/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Chefier</h1>
      <Button testid='register-button'>
        <Link href='/register'>Register</Link>
      </Button>
    </div>
  );
}
