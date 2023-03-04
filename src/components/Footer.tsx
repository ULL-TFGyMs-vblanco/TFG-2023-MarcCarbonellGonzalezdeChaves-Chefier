import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.links}>
          <Link className={styles.logo} href='/'>
            Chefier
          </Link>
          <hr className={styles.divider} />
          <ul className={styles.explore__links}>
            <label className={styles.links__label}>Explore</label>
            <li>
              <Link className={styles.link} href='/recipes'>
                Recipes
              </Link>
            </li>
            <li>
              <Link className={styles.link} href='/new-recipe'>
                New Recipe
              </Link>
            </li>
          </ul>
          <hr className={styles.solid} />
          <ul>
            <label className={styles.links__label}>Info</label>
            <li>
              <Link className={styles.link} href='/about'>
                About
              </Link>
            </li>
            <li>
              <Link className={styles.link} href='/contact'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <p className={styles.authoring}>Created by Marc Carbonell</p>
      </div>
    </footer>
  );
};
