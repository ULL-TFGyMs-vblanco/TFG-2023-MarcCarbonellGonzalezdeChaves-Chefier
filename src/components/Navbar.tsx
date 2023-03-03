import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';

export const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [animation, setAnimation] = useState(true);

  const handleToggle = () => {
    toggle ? setAnimation(!animation) : setToggle(true);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.left__elements}>
            <button className={styles.toggle} onClick={() => handleToggle()}>
              <RxHamburgerMenu size={25} />
            </button>
            <Link className={styles.logo} href='/'>
              Chefier
            </Link>
          </div>
          <div className={styles.right__elements}>
            <input type='text' placeholder='Search' className={styles.search} />
            <ul className={styles.links}>
              <li className={styles.link}>
                <Link href='/recipes'>Recipes</Link>
              </li>
              <li className={styles.link}>
                <Link href='/new-recipe'>New Recipe</Link>
              </li>
            </ul>
            <Link className={styles.avatar} href='/profile'>
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
      {toggle && (
        <div
          className={`${styles.toggle__menu} ${
            animation ? styles.in__animation : styles.out__animation
          }`}
        >
          <ul className={styles.toggle__links}>
            <li className={styles.toggle__link}>
              <Link href='/recipes'>Recipes</Link>
            </li>
            <li className={styles.toggle__link}>
              <Link href='/new-recipe'>New Recipe</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
