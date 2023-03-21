import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import useToggle from 'src/hooks/useToggle';
import styles from 'src/styles/layout/Navbar.module.css';
import { ToggleMenu } from './ToggleMenu';
import { Searchbar } from '../ui/Searchbar';
import { Avatar } from '../ui/Avatar';
import { useSession } from 'next-auth/react';

export const Navbar: React.FC = () => {
  const { firstToggle, toggle, handleToggle } = useToggle();
  const { data: session } = useSession();

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
            <Searchbar testid='search' />
            <ul className={styles.links}>
              <li className={styles.link} data-testid='navigation-link'>
                <Link href='/recipes'>Recipes</Link>
              </li>
              <li className={styles.link} data-testid='navigation-link'>
                <Link href='/new-recipe'>New&nbsp;Recipe</Link>
              </li>
            </ul>
            <div className={styles.avatar__container}>
              <Avatar
                source={
                  session?.user?.image
                    ? session.user.image
                    : '/avatar_default.jpg'
                }
                link={session ? '/profile' : '/auth/login'}
                size={40}
                username='Default'
                style={styles.avatar}
                testid='avatar'
              />
            </div>
          </div>
        </div>
      </nav>
      {!firstToggle && (
        <ToggleMenu toggleHandler={handleToggle} toggleAnimation={toggle} />
      )}
    </div>
  );
};
