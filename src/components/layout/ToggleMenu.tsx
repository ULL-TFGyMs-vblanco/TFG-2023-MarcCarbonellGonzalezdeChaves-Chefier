import Link from 'next/link';
import styles from 'src/styles/ToggleMenu.module.css';
import { Avatar } from '../ui/Avatar';

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
      <div className={styles.user__info__container}>
        <Avatar
          source='/avatar_default.jpg'
          size={55}
          username='Default'
          style={styles.avatar}
          testid='toggle_avatar'
        />
        <Link href='/profile' data-testid='toggle-avatar'>
          <p className={styles.nickname} data-testid='user-name'>
            Usuario
          </p>
        </Link>
        <Link href='/profile' data-testid='toggle-avatar'>
          <p className={styles.username} data-testid='user-atname'>
            @usuario
          </p>
        </Link>
      </div>
      <hr className={styles.divider} />
      <ul className={styles.links}>
        <li>
          <Link
            className={styles.link}
            href='/recipes'
            data-testid='toggle-navigation-link'
          >
            Recipes
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            href='/new-recipe'
            data-testid='toggle-navigation-link'
          >
            New Recipe
          </Link>
        </li>
      </ul>
      <hr className={styles.divider} />
      <ul className={styles.links}>
        <li>
          <Link
            className={styles.link}
            href='/about'
            data-testid='toggle-info-link'
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
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
