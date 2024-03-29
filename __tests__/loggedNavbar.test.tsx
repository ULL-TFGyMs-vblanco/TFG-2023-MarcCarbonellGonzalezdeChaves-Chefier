import { describe, it, afterEach, vi, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../src/components/layout/Navbar';
import { MockImageProps } from '../src/types/test';

describe('Navbar', (): void => {
  afterEach(() => {
    cleanup();
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

  vi.mock('next-auth/react', async () => {
    const mod: object = await vi.importActual('next-auth/react');
    return {
      ...mod,
      useSession: () => ({
        data: {
          user: {
            user: 'Usuario',
            email: 'user@gmail.com',
            image: '/avatar_default.jpg',
          },
        },
      }),
      signOut: () => {
        return Promise.resolve(undefined);
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

  describe('Bar', (): void => {
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const navLinks = screen.getAllByTestId('navigation-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('Nueva receta');
      screen.getByText('Siguiendo');
    });
    it('should render avatar', (): void => {
      render(<Navbar />);

      screen.getByTestId('avatar');
    });
  });
  describe('Toggle menu', (): void => {
    it('toggle menu should render avatar', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      screen.getByTestId('avatar');
    });
    it('toggle menu should render user name and atname', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      screen.getByTestId('user-name');
      screen.getByTestId('user-atname');
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      const navLinks = screen.getAllByTestId('toggle-navigation-link');
      expect(navLinks.length).toBe(2);
      expect(screen.getAllByText('Nueva receta').length).toBe(2);
      expect(screen.getAllByText('Siguiendo').length).toBe(2);
    });
    it('should render log out button', (): void => {
      render(<Navbar />);

      screen.getByTestId('logout-button');
      screen.getByText('Cerrar sesión');
      fireEvent.click(screen.getByTestId('logout-button'));
    });
  });
});
