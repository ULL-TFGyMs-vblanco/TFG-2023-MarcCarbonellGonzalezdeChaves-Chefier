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
      useSession: () => ({}),
    };
  });

  it('should render', (): void => {
    render(<Navbar />);
  });
  describe('Bar', (): void => {
    it('should render logo correctly', (): void => {
      render(<Navbar />);

      screen.getByTestId('logo');
    });
    it('should render search bar', (): void => {
      render(<Navbar />);

      screen.getByTestId('search');
      screen.getByPlaceholderText('Search...');
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const navLinks = screen.getAllByTestId('navigation-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('Log in');
      screen.getByText('New Recipe');
    });
    it('should render toggle button', (): void => {
      render(<Navbar />);

      screen.getByTestId('toggle-button');
    });
  });
  describe('Toggle menu', (): void => {
    it('should not render toggle menu', (): void => {
      render(<Navbar />);

      expect(screen.queryByTestId('toggle-menu')).toBeNull();
    });
    it('should display and collapse toggle menu when clicking toggle button', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      const toggleMenu = screen.getByTestId('toggle-menu');
      expect(toggleMenu.className).toMatch(/in__animation/);
      fireEvent.click(toggleButton);
      expect(toggleMenu.className).toMatch(/out__animation/);
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      const navLinks = screen.getAllByTestId('toggle-navigation-link');
      expect(navLinks.length).toBe(2);
      expect(screen.getAllByText('Log in').length).toBe(2);
      expect(screen.getAllByText('New Recipe').length).toBe(2);
    });
    it('should render help navigation links', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      const navLinks = screen.getAllByTestId('toggle-info-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('About');
      screen.getByText('Contact');
    });
  });
});
