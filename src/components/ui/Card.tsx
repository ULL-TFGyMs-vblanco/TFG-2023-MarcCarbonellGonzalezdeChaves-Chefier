import { ReactNode } from 'react';
import styles from 'src/styles/ui/Card.module.css';

interface CardProps {
  children: ReactNode;
  style?: string;
  testid?: string;
}

export const Card: React.FC<CardProps> = ({ children, style, testid }) => {
  return (
    <div className={`${styles.card} ${style}`} data-testid={testid}>
      {children}
    </div>
  );
};
