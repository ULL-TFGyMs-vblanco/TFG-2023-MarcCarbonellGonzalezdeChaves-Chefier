import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../src/pages/index';
import { MockImageProps } from '../src/types/test';

describe('Home', (): void => {
  afterEach(cleanup);

  vi.mock('next-auth/react', async () => {
    const mod: object = await vi.importActual('next-auth/react');
    return {
      ...mod,
      useSession: () => ({
        data: {
          user: { user: 'Usuario', email: 'user@gmail.com' },
        },
      }),
      signOut: () => {
        return Promise.resolve(undefined);
      },
    };
  });

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
      useRouter: () => ({
        query: {
          error: 'error',
        },
        push: () => [],
      }),
    };
  });

  it('should render', (): void => {
    render(<Home />);
  });
  it('should render title', (): void => {
    render(<Home />);

    screen.getByText('Explorar recetas');
  });
});
