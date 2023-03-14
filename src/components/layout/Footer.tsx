import Link from 'next/link';
import styles from 'src/styles/layout/Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.links}>
          <Link className={styles.logo} href='/' data-testid='logo'>
            Chefier
          </Link>
          <hr className={styles.divider} />
          <ul>
            <label className={styles.links__label}>Sitemap</label>
            <li>
              <Link
                className={styles.link}
                href='/recipes'
                data-testid='sitemap-link'
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href='/new-recipe'
                data-testid='sitemap-link'
              >
                New Recipe
              </Link>
            </li>
          </ul>
          <hr className={styles.divider} />
          <ul>
            <label className={styles.links__label}>Info</label>
            <li>
              <Link
                className={styles.link}
                href='/about'
                data-testid='info-link'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                href='/contact'
                data-testid='info-link'
              >
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
