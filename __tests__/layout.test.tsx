import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Layout } from '../src/components/layout/Layout';
import { MockImageProps } from '../src/types/test';

describe('Layout', (): void => {
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

  vi.mock('../src/hooks/useLoggedUser', async () => {
    return {
      useLoggedUser: () => ({
        user: {
          name: 'chefier',
          email: 'chefier@chefier.com',
          image: 'https://ik.imagekit.io/czvxqgafa/avatar_default.jpg',
          accessToken: '1234',
        },
        isLoading: false,
        isError: undefined,
      }),
    };
  });

  vi.mock('next-auth/react', async () => {
    const mod: object = await vi.importActual('next-auth/react');
    return {
      ...mod,
      useSession: () => ({
        data: {
          user: { user: 'Usuario', email: 'user@gmail.com' },
        },
      }),
    };
  });

  it('should render', (): void => {
    render(<Layout />);
  });
  it('should render children', (): void => {
    render(
      <Layout>
        <p>Components</p>
      </Layout>
    );
    screen.getByText('Components');
  });
});
