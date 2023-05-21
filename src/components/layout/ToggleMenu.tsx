import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from 'src/styles/layout/ToggleMenu.module.css';
import { Avatar } from '../ui/Avatar';
import { Loading } from '@nextui-org/react';
import { useLoggedUser } from '../../hooks/useLoggedUser';

export const ToggleMenu: React.FC<{
  toggleAnimation: boolean;
  toggleHandler: () => void;
}> = ({ toggleAnimation, toggleHandler }) => {
  const { data: session } = useSession();
  const { user, isLoading, isError } = useLoggedUser();

  const signOutHandler = async () => {
    toggleHandler();
    await signOut();
  };

  return (
    <div
      className={`${styles.toggle__menu} ${
        toggleAnimation ? styles.in__animation : styles.out__animation
      }`}
      data-testid='toggle-menu'
    >
      {session ? (
        <>
          <div className={styles.user__info__container}>
            {isLoading ? (
              <Loading />
            ) : isError ? (
              <h1>{isError}</h1>
            ) : (
              <>
                <Avatar
                  source={user.image}
                  link={`/${user.username}`}
                  size={75}
                  username='Default'
                  className={styles.avatar}
                  testid='toggle_avatar'
                  onClick={toggleHandler}
                />
                <Link
                  href={`/${user.username}`}
                  data-testid='toggle-avatar'
                  onClick={toggleHandler}
                >
                  <p className={styles.nickname} data-testid='user-name'>
                    {user.nickname ? user.nickname : user.username}
                  </p>
                </Link>
                <Link
                  href={`/${user.username}`}
                  data-testid='toggle-avatar'
                  onClick={toggleHandler}
                >
                  <p className={styles.username} data-testid='user-atname'>
                    @{user.username}
                  </p>
                </Link>
              </>
            )}
          </div>
          <ul className={styles.links}>
            <li>
              <button
                className={styles.logout__button}
                data-testid='logout-button'
                onClick={signOutHandler}
              >
                Cerrar&nbsp;sesión
              </button>
            </li>
          </ul>
          <hr className={styles.divider} />
          <hr className={styles.divider} />
          <ul className={styles.links}>
            {isLoading ? (
              <Loading />
            ) : (
              !isError && (
                <li>
                  <Link
                    className={styles.link}
                    href={`/?following=${user._id}`}
                    data-testid='toggle-navigation-link'
                    onClick={toggleHandler}
                  >
                    Siguiendo
                  </Link>
                </li>
              )
            )}
            <li>
              <Link
                className={styles.link}
                href='/recipe/new'
                data-testid='toggle-navigation-link'
                onClick={toggleHandler}
              >
                Nueva&nbsp;receta
              </Link>
            </li>
          </ul>
        </>
      ) : (
        <ul className={styles.links}>
          <li>
            <Link
              className={styles.link}
              href='/auth/login'
              data-testid='toggle-navigation-link'
              onClick={toggleHandler}
            >
              Iniciar&nbsp;sesión
            </Link>
          </li>
        </ul>
      )}
      <hr className={styles.divider} />
      <ul className={styles.links}>
        <li>
          <Link
            className={styles.link}
            href='/about'
            data-testid='toggle-info-link'
            onClick={toggleHandler}
          >
            Sobre&nbsp;nosotros
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            href='/contact'
            data-testid='toggle-info-link'
            onClick={toggleHandler}
          >
            Contacto
          </Link>
        </li>
      </ul>
    </div>
  );
};
