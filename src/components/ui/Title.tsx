import { ReactNode } from 'react';
import styles from 'src/styles/ui/Title.module.css';

interface TitleProps {
  children: ReactNode;
  className?: string;
  testid?: string;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  children,
  className,
  testid,
  xs,
  sm,
  md,
  lg,
  xl,
}) => {
  return (
    <>
      {xs && (
        <p className={`${styles.title__xs} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
      {sm && (
        <p className={`${styles.title__sm} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
      {md && (
        <p className={`${styles.title__md} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
      {lg && (
        <p className={`${styles.title__lg} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
      {xl && (
        <p className={`${styles.title__xl} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
      {!xs && !sm && !md && !lg && !xl && (
        <p className={`${styles.title__md} ${className}`} data-testid={testid}>
          {children}
        </p>
      )}
    </>
  );
};
