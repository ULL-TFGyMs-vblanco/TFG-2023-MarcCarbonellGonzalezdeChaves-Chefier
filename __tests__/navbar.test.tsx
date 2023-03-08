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

      screen.getByTestId('logo');
    });
    it('should render search bar', (): void => {
      render(<Navbar />);

      screen.getByTestId('search');
      screen.getByPlaceholderText('Search');
    });
    it('should render navigation links', (): void => {
      render(<Navbar />);

      const navLinks = screen.getAllByTestId('navigation-link');
      expect(navLinks.length).toBe(2);
      screen.getByText('Recipes');
      screen.getByText('New Recipe');
    });
    it('should render avatar', (): void => {
      render(<Navbar />);

      screen.getByTestId('avatar');
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

      const toggleButton = screen.getByTestId('toggle-button');
      fireEvent.click(toggleButton);
      screen.getByTestId('toggle-avatar');
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
      expect(screen.getAllByText('Recipes').length).toBe(2);
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
