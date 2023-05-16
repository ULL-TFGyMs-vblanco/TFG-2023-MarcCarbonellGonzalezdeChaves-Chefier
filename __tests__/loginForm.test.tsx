import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LoginForm } from '../src/components/auth/LoginForm';
import { SignInOptions } from 'next-auth/react';
import { MockImageProps } from '../src/types/test';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockLogin = vi.fn((provider: string, data: SignInOptions) => {
  return Promise.resolve();
});

describe('Login form', (): void => {
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

  it('should render', (): void => {
    render(<LoginForm onLogin={mockLogin} />);
  });
  it('should render form card', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    screen.getByTestId('form-card');
  });
  it('should render title', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    screen.getByText('Inicia sesión en Chefier');
  });
  it('should render form', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    screen.getByTestId('login-form');
  });
  it('should render form fields', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    const fields = screen.getAllByTestId('form-field');
    expect(fields.length).toBe(2);
    screen.getByText('Correo electrónico');
    screen.getByText('Contraseña');
  });
  it('should render form checkbox', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    screen.getByTestId('form-checkbox');
    screen.getByText('mostrar contraseña');
  });
  it('should show password when clicking checkbox', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    const checkbox = screen.getByTestId('checkbox');
    expect(screen.getByTestId('password-input')).toHaveProperty(
      'type',
      'password'
    );
    fireEvent.click(checkbox);
    expect(screen.getByTestId('password-input')).toHaveProperty('type', 'text');
  });
  it('should render submit button', (): void => {
    render(<LoginForm onLogin={mockLogin} />);

    screen.getByTestId('submit-button');
    screen.getByText('Iniciar sesión');
  });
  it('should call submit handler with field values when clicking submit button', async () => {
    render(<LoginForm onLogin={mockLogin} />);

    const email = screen.getByTestId('email-input');
    fireEvent.input(email, { target: { value: 'user@gmail.com' } });
    const password = screen.getByTestId('password-input');
    fireEvent.input(password, { target: { value: 'Password1' } });
    const submit = screen.getByTestId('submit-button');
    fireEvent.submit(submit);
    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));
    expect(mockLogin).toBeCalledWith('credentials', {
      callbackUrl: '/',
      email: 'user@gmail.com',
      password: 'Password1',
    });
  });
});
