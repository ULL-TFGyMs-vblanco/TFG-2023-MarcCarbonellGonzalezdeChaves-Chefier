import { ReactNode } from 'react';
import styles from 'src/styles/ui/Card.module.css';

// Props for Card component
interface CardProps {
  // Content to be displayed
  children: ReactNode;
  // Component class name
  className?: string;
  // Test id for testing purposes
  testid?: string;
  // Function to be executed on click
  onClick?: () => void;
}

// Card component
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
