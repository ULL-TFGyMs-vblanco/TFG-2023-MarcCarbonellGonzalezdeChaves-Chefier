import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { RegisterForm } from '../src/components/auth/RegisterForm';
import { SignInOptions } from 'next-auth/react';

const mockRegister = vi.fn(() => {
  return Promise.resolve(true);
});

const mockLogin = vi.fn((provider: string, data: SignInOptions) => {
  return Promise.resolve(data);
});

describe('Register form', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );
  });
  it('should render form card', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    screen.getByTestId('form-card');
  });
  it('should render title', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    screen.getByText('Register');
  });
  it('should render form', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    screen.getByTestId('register-form');
  });
  it('should render form fields', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const fields = screen.getAllByTestId('form-field');
    expect(fields.length).toBe(4);
    screen.getByText('Username');
    screen.getByText('Email');
    screen.getByText('Password');
    screen.getByText('Confirm password');
  });
  it('should render form checkbox', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    screen.getByTestId('form-checkbox');
    screen.getByText('show password');
  });
  it('should show password when clicking checkbox', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const checkbox = screen.getByTestId('checkbox');
    expect(screen.getByTestId('password-input')).toHaveProperty(
      'type',
      'password'
    );
    expect(screen.getByTestId('confirm-password-input')).toHaveProperty(
      'type',
      'password'
    );
    fireEvent.click(checkbox);
    expect(screen.getByTestId('password-input')).toHaveProperty('type', 'text');
    expect(screen.getByTestId('confirm-password-input')).toHaveProperty(
      'type',
      'text'
    );
  });
  it('should render submit button', (): void => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    screen.getByTestId('submit-button');
    screen.getByText('register');
  });
  it('should display an error alert when username is not provided', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(3)
    );
    expect(mockRegister).not.toBeCalled();
    expect(screen.getByText('Username is required'));
  });
  it('should display an error alert when username has more than 10 characters', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const username = screen.getByTestId('username-input');
    fireEvent.change(username, { target: { value: 'user1234567' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(3)
    );
    expect(mockRegister).not.toBeCalled();
    expect(screen.getByText('Username must have less than 10 characters'));
  });
  it('should display an error alert when email is not provided/valid', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(3)
    );
    expect(mockRegister).not.toBeCalled();
    expect(screen.getByText('Email not valid'));
  });
  it('should display an error alert when email is not provided/valid', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(3)
    );
    expect(mockRegister).not.toBeCalled();
    expect(screen.getByText('Password must be strong.'));
  });
  it('should show more/less error info when clicking a link', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(3)
    );
    expect(mockRegister).not.toBeCalled();
    fireEvent.click(screen.getByTestId('show-more'));
    expect(
      screen.getByText(
        'Password must be strong. At least eight characters, one lowercase, one upercase and one number.'
      )
    );
    fireEvent.click(screen.getByTestId('show-less'));
    expect(screen.getByText('Password must be strong.'));
  });
  it('should display an error alert when confirm password is different than password', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

    const password = screen.getByTestId('password-input');
    fireEvent.input(password, { target: { value: 'test' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);

    await waitFor(() =>
      expect(screen.queryAllByTestId('alert')).toHaveLength(4)
    );
    expect(mockRegister).not.toBeCalled();
    expect(screen.getByText('Different passwords'));
  });
  it('should call submit handler with field values when clicking submit button', async () => {
    render(
      <RegisterForm
        onRegister={mockRegister}
        onOauthLogin={mockLogin}
        toggleModal={(visible: boolean) => visible}
      />
    );

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
    expect(mockRegister).toBeCalledWith({
      username: 'user',
      email: 'user@gmail.com',
      password: 'Password1',
    });
  });
});
