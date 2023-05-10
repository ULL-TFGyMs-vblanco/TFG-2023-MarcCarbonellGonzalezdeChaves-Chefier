import { ReactNode } from 'react';
import styles from 'src/styles/ui/Card.module.css';

interface CardProps {
  children: ReactNode;
  style?: string;
  testid?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  testid,
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${style}`}
      data-testid={testid}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
