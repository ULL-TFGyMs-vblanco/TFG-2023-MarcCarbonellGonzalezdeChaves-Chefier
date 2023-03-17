import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Register from '../src/pages/register';
import auth from 'src/services/auth';

describe('Register', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Register />);
  });
  it('should render form', (): void => {
    render(<Register />);

    screen.getByText('Register');
  });
  it('should call register service when clicking submit button', async (): Promise<void> => {
    render(<Register />);

    const spy = vi.spyOn(auth, 'register');

    const username = screen.getByTestId('username-input');
    fireEvent.input(username, { target: { value: 'user' } });
    const email = screen.getByTestId('email-input');
    fireEvent.input(email, { target: { value: 'user@gmail.com' } });
    const password = screen.getByTestId('password-input');
    fireEvent.input(password, { target: { value: 'Password1' } });
    const confirmPassword = screen.getByTestId('confirm-password-input');
    fireEvent.input(confirmPassword, { target: { value: 'Password1' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(spy).toBeCalledWith({
      username: 'user',
      email: 'user@gmail.com',
      password: 'Password1',
      confirmPassword: 'Password1',
      showPassword: false,
    });
  });
});
