import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useToggleMenu } from 'src/hooks/useToggleMenu';
import styles from 'src/styles/layout/Navbar.module.css';
import { ToggleMenu } from './ToggleMenu';
import { Avatar } from '../ui/Avatar';
import { signOut, useSession } from 'next-auth/react';
import { Loading, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { useLoggedUser } from '../../hooks/useLoggedUser';

export const Navbar: React.FC = () => {
  const { isDark } = useTheme();
  const { setTheme } = useNextTheme();
  const [firstToggle, toggle, handleToggle] = useToggleMenu();
  const { data: session } = useSession();
  const { user, isLoading, isError } = useLoggedUser();

  const signOutHandler = async () => {
    await signOut();
  };

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
              <Image
                src={`/images/chefier-banner${isDark ? '-dark' : ''}.png`}
                alt='logo'
                width={155}
                height={100}
                priority
                className={styles.logo__image__big}
              />
              <Image
                src={`/images/chefier${isDark ? '-dark' : ''}.png`}
                alt='logo'
                width={60}
                height={60}
                priority
                className={styles.logo__image__small}
              />
            </Link>
          </div>
          <div className={styles.right__elements}>
            <input
              className={styles.search}
              type='text'
              placeholder='Buscar...'
              data-testid='search'
            />
            <div className={styles.theme__button__container}>
              <button
                className={styles.theme__button}
                onClick={() => {
                  setTheme(isDark ? 'light' : 'dark');
                }}
              >
                {isDark ? (
                  <BsFillSunFill className={styles.sun__theme__icon} />
                ) : (
                  <BsFillMoonFill className={styles.moon__theme__icon} />
                )}
              </button>
            </div>
            <ul className={styles.links}>
              <li className={styles.links__col}>
                <Link
                  className={styles.link}
                  href='/recipe/new'
                  data-testid='navigation-link'
                >
                  Nueva&nbsp;Receta
                </Link>
              </li>
              {session ? (
                <>
                  <li className={styles.links__col}>
                    <button
                      className={styles.logout__button}
                      data-testid='logout-button'
                      onClick={signOutHandler}
                    >
                      Cerrar&nbsp;sesión
                    </button>
                  </li>
                  <li className={styles.links__col}>
                    {isLoading ? (
                      <Loading />
                    ) : isError ? (
                      <h1>{isError}</h1>
                    ) : (
                      <Avatar
                        source={user.image}
                        link={`/${user.username}`}
                        size={40}
                        username='Default'
                        style={styles.avatar}
                        testid='avatar'
                      />
                    )}
                  </li>
                </>
              ) : (
                <li className={styles.links__col}>
                  <Link
                    className={styles.link}
                    href='/auth/login'
                    data-testid='navigation-link'
                  >
                    Iniciar&nbsp;sesión
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
