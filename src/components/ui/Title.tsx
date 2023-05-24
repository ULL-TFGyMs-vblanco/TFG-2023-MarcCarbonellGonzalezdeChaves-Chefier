import { ReactNode } from 'react';
import styles from 'src/styles/ui/Title.module.css';

// Props for Title component
interface TitleProps {
  // Content to be displayed
  children: ReactNode;
  // Component class name
  className?: string;
  // Test id for testing purposes
  testid?: string;
  // Whether the title is extra small
  xs?: boolean;
  // Whether the title is small
  sm?: boolean;
  // Whether the title is medium
  md?: boolean;
  // Whether the title is large
  lg?: boolean;
  // Whether the title is extra large
  xl?: boolean;
}

// Title component
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
