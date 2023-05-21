import styles from 'src/styles/404.module.css';
import Image from 'next/image';
import { Card } from '../components/ui/Card';
import Link from 'next/link';
import { useTheme } from '@nextui-org/react';

export default function Custom404() {
  const { isDark } = useTheme();

  return (
    <Card className={styles.container}>
      <Link className={styles.logo} href='/' data-testid='logo'>
        <Image
          src={`/images/chefier${isDark ? '-dark' : ''}.png`}
          alt='logo'
          width={200}
          height={200}
          style={{ display: 'block' }}
        />
      </Link>
      <div className={styles.text}>
        <p className={styles.status}>404</p>
        <h3>Página no encontrada</h3>
        <h5>La página que buscas no existe o no se encuentra disponible.</h5>
      </div>
    </Card>
  );
}
