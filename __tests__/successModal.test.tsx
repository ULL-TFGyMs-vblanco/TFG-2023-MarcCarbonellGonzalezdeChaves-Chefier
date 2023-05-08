import { describe, it, afterEach, expect, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import Register from '../src/pages/auth/register';
import axios from '../axios_config';
import { MockImageProps } from '../src/types/test';

describe('Succes modal', (): void => {
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

  vi.mock('next/router', async () => {
    return {
      useRouter: () => [],
    };
  });

  const spy = vi.spyOn(axios, 'post').mockImplementation(async () => {
    return Promise.resolve({});
  });

  it('should show the success modal when register successfully', async (): Promise<void> => {
    render(<Register />);

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
    expect(spy).toBeCalledWith('/auth/register', {
      username: 'user',
      email: 'user@gmail.com',
      password: 'Password1',
    });
    await waitFor(() => expect(screen.getByTestId('modal')).toBeDefined());
    screen.getByText('¡Listo!');
    const close = screen.getByText('Aceptar');
    fireEvent.click(close);
    const button = document.getElementsByClassName('nextui-modal-close-icon');
    expect(button).toHaveLength(1);
    fireEvent.click(button[0]);
    await waitFor(() => expect(screen.queryByTestId('modal')).toBeNull());
    expect(screen.queryByText('¡Listo!')).toBeNull();
  });
});
