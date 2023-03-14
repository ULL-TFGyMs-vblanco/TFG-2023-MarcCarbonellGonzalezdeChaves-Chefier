import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import styles from 'src/styles/layout/Layout.module.css';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={`container ${styles.main}`}>{children}</main>
      <Footer />
    </div>
  );
};
