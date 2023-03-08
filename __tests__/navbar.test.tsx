import { describe, it, afterEach, vi, expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '../src/components/Navbar';

interface MockImageProps {
  src: string;
  alt: string;
  width: string;
  height: string;
  style: React.CSSProperties;
}

describe('Navbar', (): void => {
  afterEach(cleanup);

  vi.mock('next/image', async () => {
    return {
      default: () =>
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
        },
    };
  });

  it('should render', (): void => {
    render(<Navbar />);
  });
  describe('Bar', (): void => {
    it('should render logo correctly', (): void => {
      render(<Navbar />);

      screen.getAllByRole('logo');
    });
    it('should render search bar', (): void => {
      render(<Navbar />);

      screen.getAllByRole('search');
      screen.getAllByPlaceholderText('Search');
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const navLinks = screen.getAllByRole('navigation-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('Recipes');
      screen.getByText('New Recipe');
    });
    it('should render avatar', (): void => {
      render(<Navbar />);

      screen.getByRole('avatar');
    });
    it('should render toggle button', (): void => {
      render(<Navbar />);

      screen.getByRole('toggle-button');
    });
  });
  describe('Toggle menu', (): void => {
    it('should not render toggle menu', (): void => {
      render(<Navbar />);

      expect(screen.queryByRole('toggle-menu')).toBeNull();
    });
    it('should display and collapse toggle menu when clicking toggle button', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByRole('toggle-button');
      fireEvent.click(toggleButton);
      const toggleMenu = screen.getByRole('toggle-menu');
      expect(toggleMenu.className).toBe(
        '_toggle__menu_e091f2 _in__animation_e091f2'
      );
      fireEvent.click(toggleButton);
      expect(toggleMenu.className).toBe(
        '_toggle__menu_e091f2 _out__animation_e091f2'
      );
    });
    it('toggle menu should render avatar', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByRole('toggle-button');
      fireEvent.click(toggleButton);
      screen.getByRole('toggle-avatar');
    });
    it('toggle menu should render user name and atname', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByRole('toggle-button');
      fireEvent.click(toggleButton);
      screen.getByRole('user-name');
      screen.getByRole('user-atname');
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByRole('toggle-button');
      fireEvent.click(toggleButton);
      const navLinks = screen.getAllByRole('toggle-navigation-link');
      expect(navLinks.length).toBe(2);
      expect(screen.getAllByText('Recipes').length).toBe(2);
      expect(screen.getAllByText('New Recipe').length).toBe(2);
    });
    it('should render help navigation links', (): void => {
      render(<Navbar />);

      const toggleButton = screen.getByRole('toggle-button');
      fireEvent.click(toggleButton);
      const navLinks = screen.getAllByRole('toggle-help-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('About');
      screen.getByText('Contact');
    });
  });
});
