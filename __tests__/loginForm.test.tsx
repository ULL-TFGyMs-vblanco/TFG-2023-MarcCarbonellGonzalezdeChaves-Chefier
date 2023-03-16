import { describe, it, afterEach, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { LoginForm } from '../src/components/auth/LoginForm';

describe('Login form', (): void => {
  afterEach(cleanup);

  const mockedSubmitHandler = vi.fn();

  it('should render', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);
  });
  it('should render form card', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    screen.getByTestId('form-card');
  });
  it('should render title', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    screen.getByText('Log In');
  });
  it('should render form', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    screen.getByTestId('login-form');
  });
  it('should render form fields', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    const fields = screen.getAllByTestId('form-field');
    expect(fields.length).toBe(2);
    screen.getByText('Email');
    screen.getByText('Password');
  });
  it('should render form checkbox', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    screen.getByTestId('form-checkbox');
    screen.getByText('show password');
  });
  it('should show password when clicking checkbox', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    const checkbox = screen.getByTestId('checkbox');
    expect(screen.getByTestId('password-input')).toHaveProperty(
      'type',
      'password'
    );
    fireEvent.click(checkbox);
    expect(screen.getByTestId('password-input')).toHaveProperty('type', 'text');
  });
  it('should render submit button', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    screen.getByTestId('submit-button');
    screen.getByText('Log in');
  });
  it('should render submit button', (): void => {
    render(<LoginForm onSubmit={mockedSubmitHandler} />);

    const email = screen.getByTestId('email-input');
    fireEvent.change(email, { target: { value: 'marc@gmail.com' } });
    const password = screen.getByTestId('password-input');
    fireEvent.change(password, { target: { value: 'Password1' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.click(submit);
    expect(mockedSubmitHandler).toBeCalled();
  });
});
