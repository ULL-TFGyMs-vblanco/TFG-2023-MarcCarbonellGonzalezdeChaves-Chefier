import { ReactNode } from 'react';
import styles from 'src/styles/ui/Title.module.css';

interface TitleProps {
  children: ReactNode;
  style?: string;
  testid?: string;
}

export const Title: React.FC<TitleProps> = ({ children, style, testid }) => {
  return (
    <p className={`${styles.title} ${style}`} data-testid={testid}>
      {children}
    </p>
  );
};
