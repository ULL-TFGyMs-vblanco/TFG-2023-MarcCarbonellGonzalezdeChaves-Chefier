import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Login from '../src/pages/auth/login';
import axios from 'axios';

describe('Login', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Login />);
  });
  it('should render form', (): void => {
    render(<Login />);

    screen.getByText('Log In');
  });
  it('should call login service when clicking submit button', async (): Promise<void> => {
    render(<Login />);

    const spy = vi.spyOn(axios, 'post').mockImplementation(async () => ({
      status: 200,
      data: {
        user: { user: 'Usuario', email: 'email@gmail.com' },
      },
    }));

    //const spy = vi.spyOn(AuthService, 'login');

    const email = screen.getByTestId('email-input');
    fireEvent.input(email, { target: { value: 'user@gmail.com' } });
    const password = screen.getByTestId('password-input');
    fireEvent.input(password, { target: { value: 'Password1' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith('/api/auth/login', {
      email: 'user@gmail.com',
      password: 'Password1',
    });
  });
});
