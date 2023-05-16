import Link from 'next/link';
import Image from 'next/image';
import styles from 'src/styles/layout/Footer.module.css';
import { useTheme } from '@nextui-org/react';

export const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={styles.footer__container}>
      <footer className={styles.footer}>
        <div className={`container ${styles.container}`}>
          <div className={styles.links}>
            <Link className={styles.logo} href='/' data-testid='logo'>
              <Image
                src={`/images/chefier-letters${isDark ? '-dark' : ''}.png`}
                alt='logo'
                width={155}
                height={90}
                style={{ display: 'block' }}
              />
            </Link>
            <hr className={styles.divider} />
            <ul>
              <label className={styles.links__label}>Información</label>
              <li>
                <Link
                  className={styles.link}
                  href='/about'
                  data-testid='info-link'
                >
                  Sobre&nbsp;nosotros
                </Link>
              </li>
              <li>
                <Link
                  className={styles.link}
                  href='/contact'
                  data-testid='info-link'
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <p className={styles.authoring}>Creado por Marc Carbonell</p>
        </div>
      </footer>
    </div>
  );
};
