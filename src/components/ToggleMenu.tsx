import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/ToggleMenu.module.css';

export const ToggleMenu: React.FC<{ toggleAnimation: boolean }> = ({
  toggleAnimation,
}) => {
  return (
    <div
      className={`${styles.toggle__menu} ${
        toggleAnimation ? styles.in__animation : styles.out__animation
      }`}
      data-testid='toggle-menu'
    >
      <Link
        className={styles.toggle__avatar}
        href='/profile'
        data-testid='toggle-avatar'
      >
        <Image
          className={styles.toggle__avatar__image}
          src='/avatar_default.jpg'
          alt='Default avatar'
          width={55}
          height={55}
          style={{ borderRadius: '50%', display: 'block' }}
        />
        <p className={styles.toggle__user__name} data-testid='user-name'>
          Usuario
        </p>
        <p className={styles.toggle__user__atname} data-testid='user-atname'>
          @usuario
        </p>
      </Link>
      <hr className={styles.divider} />
      <ul className={styles.toggle__links}>
        <li>
          <Link
            className={styles.toggle__link}
            href='/recipes'
            data-testid='toggle-navigation-link'
          >
            Recipes
          </Link>
        </li>
        <li>
          <Link
            className={styles.toggle__link}
            href='/new-recipe'
            data-testid='toggle-navigation-link'
          >
            New Recipe
          </Link>
        </li>
      </ul>
      <hr className={styles.divider} />
      <ul className={styles.toggle__links}>
        <li>
          <Link
            className={styles.toggle__link}
            href='/about'
            data-testid='toggle-info-link'
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={styles.toggle__link}
            href='/contact'
            data-testid='toggle-info-link'
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};
