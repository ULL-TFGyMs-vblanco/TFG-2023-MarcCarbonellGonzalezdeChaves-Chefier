import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import useToggle from 'src/hooks/useToggle';
import styles from 'src/styles/Navbar.module.css';
import { ToggleMenu } from './ToggleMenu';
import { Searchbar } from './Searchbar';

export const Navbar: React.FC = () => {
  const { firstToggle, toggle, handleToggle } = useToggle();

  return (
    <div className={styles.navbar}>
      <nav className={styles.bar}>
        <div className={`container ${styles.container}`}>
          <div className={styles.left__elements}>
            <button
              className={styles.toggle}
              onClick={handleToggle}
              data-testid='toggle-button'
            >
              <RxHamburgerMenu size={25} />
            </button>
            <Link className={styles.logo} href='/' data-testid='logo'>
              Chefier
            </Link>
          </div>
          <div className={styles.right__elements}>
            <Searchbar />
            <ul className={styles.links}>
              <li className={styles.link} data-testid='navigation-link'>
                <Link href='/recipes'>Recipes</Link>
              </li>
              <li className={styles.link} data-testid='navigation-link'>
                <Link href='/new-recipe'>New Recipe</Link>
              </li>
            </ul>
            <Link
              className={styles.avatar}
              href='/profile'
              data-testid='avatar'
            >
              <Image
                src='/avatar_default.jpg'
                alt='Default avatar'
                width={40}
                height={40}
                style={{ borderRadius: '50%', display: 'block' }}
              />
            </Link>
          </div>
        </div>
      </nav>
      {!firstToggle && <ToggleMenu toggleAnimation={toggle} />}
    </div>
  );
};
