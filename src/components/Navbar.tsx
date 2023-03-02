import Link from 'next/link';
import React from 'react';
import styles from '../styles/navbar.module.css';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <Link className={styles.navbar__logo} href='/'>
          Chefier
        </Link>
        <div className={styles.navbar__elements}>
          <ul className={styles.navbar__links}>
            <li className={styles.navbar__link}>
              <Link className={styles.link} href='/recipes'>
                Recipes
              </Link>
            </li>
            <li className={styles.navbar__link}>
              <Link className={styles.link} href='/new-recipe'>
                New Recipe
              </Link>
            </li>
          </ul>
          <Link className={styles.navbar__avatar} href='/profile'>
            <Image
              src='/images/avatar_default.jpg'
              alt='Default avatar'
              width={40}
              height={40}
              style={{ borderRadius: '50%', display: 'block' }}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};
