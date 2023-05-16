import { describe, it, afterEach, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Register from '../src/pages/auth/register';
import UserService from '../src/services/UserService';
import Login from '../src/pages/auth/login';
import { MockImageProps } from '../src/types/test';

describe('Register', (): void => {
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

  vi.mock('next-auth/react', async () => {
    const mod: object = await vi.importActual('next-auth/react');
    return {
      ...mod,
      signIn: () => {
        return Promise.resolve(undefined);
      },
    };
  });

  vi.mock('next/router', async () => {
    return {
      useRouter: () => ({ query: { error: undefined } }),
    };
  });

  const spy = vi.spyOn(UserService, 'login');

  it('should sign in with Google provider from register page', async (): Promise<void> => {
    render(<Register />);

    fireEvent.click(screen.getByTestId('google-login'));
    expect(spy).toBeCalledWith('google', { callbackUrl: '/' });
  });
  it('should sign in with GitHub provider from register page', async (): Promise<void> => {
    render(<Register />);

    fireEvent.click(screen.getByTestId('github-login'));
    expect(spy).toBeCalledWith('github', { callbackUrl: '/' });
  });
  it('should sign in with Google provider from login page', async (): Promise<void> => {
    render(<Login />);

    fireEvent.click(screen.getByTestId('google-login'));
    expect(spy).toBeCalledWith('google', { callbackUrl: '/' });
  });
  it('should sign in with GitHub provider from login page', async (): Promise<void> => {
    render(<Login />);

    fireEvent.click(screen.getByTestId('github-login'));
    expect(spy).toBeCalledWith('github', { callbackUrl: '/' });
  });
});
