import { describe, it, afterEach, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Register from '../src/pages/auth/register';
import AuthService from '../src/services/AuthService';
import Login from '../src/pages/auth/login';

describe('Register', (): void => {
  afterEach(cleanup);

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

  const spy = vi.spyOn(AuthService, 'login');

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
