import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import useToggleMenu from 'src/hooks/useToggleMenu';
import styles from 'src/styles/layout/Navbar.module.css';
import { ToggleMenu } from './ToggleMenu';
import { Avatar } from '../ui/Avatar';
import { signOut, useSession } from 'next-auth/react';
import { Loading } from '@nextui-org/react';
import useUser from '../../hooks/useUser';

export const Navbar: React.FC = () => {
  const [firstToggle, toggle, handleToggle] = useToggleMenu();
  const { data: session } = useSession();
  const { user, isLoading, isError } = useUser('email', session?.user.email);

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
            <input
              className={styles.search}
              type='text'
              placeholder='Search...'
              data-testid='search'
            />
            <ul className={styles.links}>
              <li className={styles.links__row}>
                <Link
                  className={styles.link}
                  href='/recipes'
                  data-testid='navigation-link'
                >
                  Recipes
                </Link>
              </li>
              <li className={styles.links__row}>
                <Link
                  className={styles.link}
                  href='/new-recipe'
                  data-testid='navigation-link'
                >
                  New&nbsp;Recipe
                </Link>
              </li>
              {session ? (
                <>
                  <li className={styles.links__row}>
                    <button
                      className={styles.logout__button}
                      data-testid='logout-button'
                      onClick={() => signOut()}
                    >
                      Log&nbsp;out
                    </button>
                  </li>
                  <li className={styles.links__row}>
                    {isLoading ? (
                      <Loading />
                    ) : isError ? (
                      <h1>{isError}</h1>
                    ) : (
                      <Avatar
                        source={user.image}
                        link={'/profile'}
                        size={40}
                        username='Default'
                        style={styles.avatar}
                        testid='avatar'
                      />
                    )}
                  </li>
                </>
              ) : (
                <li className={styles.links__row}>
                  <Link
                    className={styles.link}
                    href='/auth/login'
                    data-testid='navigation-link'
                  >
                    Log&nbsp;in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {!firstToggle && (
        <ToggleMenu toggleHandler={handleToggle} toggleAnimation={toggle} />
      )}
    </div>
  );
};
