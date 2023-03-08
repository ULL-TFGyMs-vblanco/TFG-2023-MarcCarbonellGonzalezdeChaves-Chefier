import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import useToggle from '../hooks/useToggle';

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
              role='toggle-button'
            >
              <RxHamburgerMenu size={25} />
            </button>
            <Link className={styles.logo} href='/' role='logo'>
              Chefier
            </Link>
          </div>
          <div className={styles.right__elements}>
            <div className={styles.search} role='search'>
              <div className={styles.search__icon}>
                <AiOutlineSearch size={15} color='darkgrey' />
              </div>
              <input
                className={styles.search__input}
                type='text'
                placeholder='Search'
              />
            </div>
            <ul className={styles.links}>
              <li className={styles.link} role='navigation-link'>
                <Link href='/recipes'>Recipes</Link>
              </li>
              <li className={styles.link} role='navigation-link'>
                <Link href='/new-recipe'>New Recipe</Link>
              </li>
            </ul>
            <Link className={styles.avatar} href='/profile' role='avatar'>
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
      {!firstToggle && (
        <div
          className={`${styles.toggle__menu} ${
            toggle ? styles.in__animation : styles.out__animation
          }`}
          role='toggle-menu'
        >
          <Link
            className={styles.toggle__avatar}
            href='/profile'
            role='toggle-avatar'
          >
            <Image
              className={styles.toggle__avatar__image}
              src='/avatar_default.jpg'
              alt='Default avatar'
              width={55}
              height={55}
              style={{ borderRadius: '50%', display: 'block' }}
            />
            <p className={styles.toggle__user__name} role='user-name'>
              Usuario
            </p>
            <p className={styles.toggle__user__atname} role='user-atname'>
              @usuario
            </p>
          </Link>
          <hr className={styles.divider} />
          <ul className={styles.toggle__links}>
            <li>
              <Link
                className={styles.toggle__link}
                href='/recipes'
                role='toggle-navigation-link'
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                className={styles.toggle__link}
                href='/new-recipe'
                role='toggle-navigation-link'
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
                role='toggle-help-link'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={styles.toggle__link}
                href='/contact'
                role='toggle-help-link'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
