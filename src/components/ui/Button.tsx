import { ReactNode } from 'react';
import styles from 'src/styles/ui/Button.module.css';

// Props for Button component
interface ButtonProps {
  // Content to be displayed
  children: ReactNode;
  // Whether the button is a submit button
  submit?: boolean;
  // Component class name
  className?: string;
  // Test id for testing purposes
  testid?: string;
  // Function to be executed on click
  onClick?: () => void | Promise<void>;
  // Whether the button is disabled
  disabled?: boolean;
}

// Button component
export const Button: React.FC<ButtonProps> = ({
  children,
  submit,
  className,
  testid,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`${styles.button} ${className}`}
      data-testid={testid}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
