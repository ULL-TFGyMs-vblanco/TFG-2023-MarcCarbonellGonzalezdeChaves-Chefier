import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Login from '../src/pages/auth/login';
import AuthService from '../src/services/AuthService';

describe('Login', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Login />);
  });
  it('should render form', (): void => {
    render(<Login />);

    screen.getByText('Log In');
  });
  it('should render the error message returned by the API', async (): Promise<void> => {
    render(<Login />);

    const spy = vi.spyOn(AuthService, 'login');

    vi.mock('next-auth/react', async () => {
      const mod: object = await vi.importActual('next-auth/react');
      return {
        ...mod,
        useSession: () => ({
          data: {
            user: { user: 'Usuario', email: 'user@gmail.com' },
          },
        }),
        signIn: () => {
          throw new Error('Invalid email or password');
        },
      };
    });

    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith({
      email: 'user@gmail.com',
      password: 'Password1',
    });
    expect(screen.getByText('Invalid email or password'));
  });
  it('should call login service when clicking submit button', async (): Promise<void> => {
    render(<Login />);

    const spy = vi.spyOn(AuthService, 'login');

    vi.mock('next-auth/react', async () => {
      const mod: object = await vi.importActual('next-auth/react');
      return {
        ...mod,
        signIn: () => ({
          user: { user: 'Usuario', email: 'user@gmail.com' },
        }),
      };
    });

    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith({
      email: 'user@gmail.com',
      password: 'Password1',
    });
  });
});
