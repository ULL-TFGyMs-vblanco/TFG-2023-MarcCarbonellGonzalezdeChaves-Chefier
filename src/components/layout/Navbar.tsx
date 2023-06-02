import Link from 'next/link';
import Image from 'next/image';
import { RxHamburgerMenu, RxPlus } from 'react-icons/rx';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useToggleMenu } from 'src/hooks/useToggleMenu';
import styles from 'src/styles/layout/Navbar.module.css';
import { ToggleMenu } from './ToggleMenu';
import { Avatar } from '../ui/Avatar';
import { signOut, useSession } from 'next-auth/react';
import { Loading, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import { useLoggedUser } from '../../hooks/useLoggedUser';
import { useRouter } from 'next/router';

// Navigation bar component
export const Navbar: React.FC = () => {
  const { firstToggle, toggle, handleToggle } = useToggleMenu();
  const { user, isLoading, isError } = useLoggedUser();
  const { data: session } = useSession();
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const router = useRouter();

  // Function to handle search
  const searchHandler = async (e: any) => {
    if (e.key !== 'Enter') return;
    if (e.target.value === '') await router.push('/');
    else await router.push(`/?search=${e.target.value}`);
    e.target.blur();
  };

  // Function to handle sign out
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
              id='toggle-button'
            >
              <RxHamburgerMenu size={25} />
            </button>
            <Link className={styles.logo} href='/' data-testid='logo'>
              <Image
                src={`/images/chefier-banner${isDark ? '-dark' : ''}.png`}
                alt='Navbar Chefier isotype'
                width={155}
                height={100}
                priority
                className={styles.logo__image__big}
              />
              <Image
                src={`/images/chefier${isDark ? '-dark' : ''}.png`}
                alt='Navbar Chefier logotype'
                width={60}
                height={60}
                priority
                className={styles.logo__image__small}
              />
            </Link>
          </div>
          <div className={styles.right__elements}>
            <button
              className={styles.new__recipe__btn}
              onClick={() => router.push('/recipe/new')}
              data-testid='new__recipe__btn'
              id='new-recipe-btn'
            >
              <RxPlus size={25} />
            </button>
            <input
              className={styles.search}
              type='text'
              placeholder='Buscar...'
              data-testid='search'
              id='searchbar'
              onKeyDown={(e) => searchHandler(e)}
            />
            <div className={styles.theme__button__container}>
              <button
                className={styles.theme__button}
                data-testid='theme-button'
                onClick={() => {
                  setTheme(isDark ? 'light' : 'dark');
                }}
              >
                {isDark ? (
                  <BsFillSunFill
                    className={styles.sun__theme__icon}
                    size={16}
                  />
                ) : (
                  <BsFillMoonFill
                    className={styles.moon__theme__icon}
                    size={16}
                  />
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
                  Nueva&nbsp;receta
                </Link>
              </li>
              {session ? (
                <>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    !isError && (
                      <li className={styles.links__col}>
                        <Link
                          className={styles.link}
                          href={`/?following=${user._id}`}
                          data-testid='navigation-link'
                        >
                          Siguiendo
                        </Link>
                      </li>
                    )
                  )}
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
                        className={styles.avatar}
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
