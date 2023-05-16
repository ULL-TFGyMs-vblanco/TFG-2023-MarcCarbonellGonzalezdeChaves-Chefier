import { describe, it, afterEach, expect, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Footer } from '../src/components/layout/Footer';
import { MockImageProps } from '../src/types/test';

describe('Footer', (): void => {
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

  it('should render', (): void => {
    render(<Footer />);
  });
  it('should render logo correctly', (): void => {
    render(<Footer />);

    screen.getByTestId('logo');
  });
  it('should render help navigation links', (): void => {
    render(<Footer />);

    screen.getByText('Información');
    const navLinks = screen.getAllByTestId('info-link');
    expect(navLinks.length).toBe(2);
    screen.getByText('Sobre nosotros');
    screen.getByText('Contacto');
  });
  it('should render authoring message', (): void => {
    render(<Footer />);

    screen.getByText('Creado por Marc Carbonell');
  });
});
