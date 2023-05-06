import { ReactNode } from 'react';
import styles from 'src/styles/ui/Button.module.css';

interface ButtonProps {
  children: ReactNode;
  submit?: boolean;
  style?: string;
  testid?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  submit,
  style,
  testid,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`${styles.button} ${style}`}
      data-testid={testid}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
