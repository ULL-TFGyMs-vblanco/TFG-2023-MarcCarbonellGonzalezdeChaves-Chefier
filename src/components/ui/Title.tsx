import { ReactNode } from 'react';
import styles from 'src/styles/ui/Title.module.css';

interface TitleProps {
  children: ReactNode;
  style?: string;
  testid?: string;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export const Title: React.FC<TitleProps> = ({
  children,
  style,
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
        <p className={`${styles.title__xs} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
      {sm && (
        <p className={`${styles.title__sm} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
      {md && (
        <p className={`${styles.title__md} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
      {lg && (
        <p className={`${styles.title__lg} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
      {xl && (
        <p className={`${styles.title__xl} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
      {!xs && !sm && !md && !lg && !xl && (
        <p className={`${styles.title__md} ${style}`} data-testid={testid}>
          {children}
        </p>
      )}
    </>
  );
};
