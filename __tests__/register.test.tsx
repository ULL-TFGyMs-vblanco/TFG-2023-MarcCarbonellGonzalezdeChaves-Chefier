import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Register from '../src/pages/auth/register';
import axios from 'axios';

describe('Register', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Register />);
  });
  it('should render form', (): void => {
    render(<Register />);

    screen.getByText('Register');
  });
  it('should render the error message returned by the API', async (): Promise<void> => {
    render(<Register />);
    const spy = vi.spyOn(axios, 'post').mockImplementation(async () => ({
      status: 400,
      data: {
        error: 'Username already exists',
      },
    }));

    fireEvent.input(screen.getByTestId('username-input'), {
      target: { value: 'user' },
    });
    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.input(screen.getByTestId('confirm-password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith('/api/auth/register', {
      username: 'user',
      email: 'user@gmail.com',
      password: 'Password1',
    });
    expect(screen.getByText('Username already exists'));
  });
  it('should send post request to the API when clicking submit button', async (): Promise<void> => {
    render(<Register />);
    const spy = vi.spyOn(axios, 'post').mockImplementation(async () => ({
      status: 200,
      data: {
        user: { user: 'Usuario', email: 'email@gmail.com' },
      },
    }));

    fireEvent.input(screen.getByTestId('username-input'), {
      target: { value: 'user' },
    });
    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: 'user@gmail.com' },
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.input(screen.getByTestId('confirm-password-input'), {
      target: { value: 'Password1' },
    });
    fireEvent.submit(screen.getByTestId('submit-button'));
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith('/api/auth/register', {
      username: 'user',
      email: 'user@gmail.com',
      password: 'Password1',
    });
  });
});
