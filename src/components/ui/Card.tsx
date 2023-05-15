import { ReactNode } from 'react';
import styles from 'src/styles/ui/Card.module.css';

interface CardProps {
  children: ReactNode;
  style?: string;
  testid?: string;
  onClick?: () => void;
  reference?: any;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  testid,
  onClick,
  reference,
}) => {
  return (
    <div
      className={`${styles.card} ${style}`}
      data-testid={testid}
      onClick={onClick}
      ref={reference}
    >
      {children}
    </div>
  );
};
