import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LoginForm } from '../src/components/auth/LoginForm';
import { LoginFormInputs } from '../src/types/forms';

const mockLogin = vi.fn((data: LoginFormInputs) => {
  return Promise.resolve(data);
});

describe('Login form', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);
  });
  it('should render form card', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    screen.getByTestId('form-card');
  });
  it('should render title', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    screen.getByText('Log In');
  });
  it('should render form', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    screen.getByTestId('login-form');
  });
  it('should render form fields', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    const fields = screen.getAllByTestId('form-field');
    expect(fields.length).toBe(2);
    screen.getByText('Email');
    screen.getByText('Password');
  });
  it('should render form checkbox', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    screen.getByTestId('form-checkbox');
    screen.getByText('show password');
  });
  it('should show password when clicking checkbox', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    const checkbox = screen.getByTestId('checkbox');
    expect(screen.getByTestId('password-input')).toHaveProperty(
      'type',
      'password'
    );
    fireEvent.click(checkbox);
    expect(screen.getByTestId('password-input')).toHaveProperty('type', 'text');
  });
  it('should render submit button', (): void => {
    render(<LoginForm submitHandler={mockLogin} />);

    screen.getByTestId('submit-button');
    screen.getByText('Log in');
  });
  it('should render submit button', async () => {
    render(<LoginForm submitHandler={mockLogin} />);

    const email = screen.getByTestId('email-input');
    fireEvent.input(email, { target: { value: 'marc@gmail.com' } });
    const password = screen.getByTestId('password-input');
    fireEvent.input(password, { target: { value: 'Password1' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(mockLogin).toBeCalledWith({
      email: 'marc@gmail.com',
      password: 'Password1',
      showPassword: false,
    });
  });
});
