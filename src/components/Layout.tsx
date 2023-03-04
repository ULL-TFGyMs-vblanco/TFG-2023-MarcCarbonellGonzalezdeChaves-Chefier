import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import styles from '@/styles/Layout.module.css';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
