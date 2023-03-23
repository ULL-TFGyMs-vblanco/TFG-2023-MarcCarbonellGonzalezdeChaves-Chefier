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
        return Promise.resolve({
          error: 'Error registering user',
          ok: false,
          status: 500,
        });
      },
    };
  });

  const spy = vi.spyOn(AuthService, 'login');

  it('should try to sign in with Google provider from register page', async (): Promise<void> => {
    render(<Register />);

    fireEvent.click(screen.getByTestId('google-login'));
    expect(spy).toBeCalledWith('google', { callbackUrl: '/' });
  });
  it('should try to sign in with Google provider from register page', async (): Promise<void> => {
    render(<Register />);

    fireEvent.click(screen.getByTestId('github-login'));
    expect(spy).toBeCalledWith('github', { callbackUrl: '/' });
  });
  it('should try to sign in with Google provider from register page', async (): Promise<void> => {
    render(<Login />);

    fireEvent.click(screen.getByTestId('google-login'));
    expect(spy).toBeCalledWith('google', { callbackUrl: '/' });
  });
  it('should try to sign in with Google provider from register page', async (): Promise<void> => {
    render(<Login />);

    fireEvent.click(screen.getByTestId('github-login'));
    expect(spy).toBeCalledWith('github', { callbackUrl: '/' });
  });
});
