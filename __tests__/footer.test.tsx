import { describe, it, afterEach, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Footer } from '../src/components/layout/Footer';

describe('Footer', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Footer />);
  });
  it('should render logo correctly', (): void => {
    render(<Footer />);

    screen.getByTestId('logo');
  });
  it('should render navigation links', (): void => {
    render(<Footer />);

    screen.getByText('Sitemap');
    const navLinks = screen.getAllByTestId('sitemap-link');
    expect(navLinks.length).toBe(2);
    screen.getByText('Recipes');
    screen.getByText('New Recipe');
  });
  it('should render help navigation links', (): void => {
    render(<Footer />);

    screen.getByText('Info');
    const navLinks = screen.getAllByTestId('info-link');
    expect(navLinks.length).toBe(2);
    screen.getByText('About');
    screen.getByText('Contact');
  });
  it('should render authoring message', (): void => {
    render(<Footer />);

    screen.getByText('Created by Marc Carbonell');
  });
});
