import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';

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
            <div className={styles.search}>
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
          <Link className={styles.toggle__avatar} href='/profile'>
            <Image
              className={styles.toggle__avatar__image}
              src='/images/avatar_default.jpg'
              alt='Default avatar'
              width={55}
              height={55}
              style={{ borderRadius: '50%', display: 'block' }}
            />
            <p className={styles.toggle__user__name}>Usuario</p>
            <p className={styles.toggle__user__at__sign}>@usuario</p>
          </Link>
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
