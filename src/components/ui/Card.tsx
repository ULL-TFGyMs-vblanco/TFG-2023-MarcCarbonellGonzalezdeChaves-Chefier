import { ReactNode } from 'react';
import styles from 'src/styles/ui/Card.module.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  testid?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  testid,
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      data-testid={testid}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
