import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Login from '../src/pages/auth/login';
import { MockImageProps } from '../src/types/test';

describe('Login', (): void => {
  afterEach(cleanup);

  vi.mock('next/image', async () => {
    return {
      default: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        function Image({ src, alt, width, height, style }: MockImageProps) {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              style={style}
            />
          );
        }
      },
    };
  });

  vi.mock('next/router', async () => {
    return {
      useRouter: () => ({ query: { error: undefined } }),
    };
  });

  it('should render', (): void => {
    render(<Login />);
  });
  it('should render form', (): void => {
    render(<Login />);

    screen.getByText('Inicia sesión en Chefier');
  });
});
