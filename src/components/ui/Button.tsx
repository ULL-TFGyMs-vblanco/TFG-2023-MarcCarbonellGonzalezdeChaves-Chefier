import { ReactNode } from 'react';
import styles from 'src/styles/ui/Button.module.css';

interface ButtonProps {
  children: ReactNode;
  submit?: boolean;
  className?: string;
  testid?: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
}

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
