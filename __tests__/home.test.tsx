import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', (): void => {
  afterEach(cleanup);

  vi.mock('next-auth/react', async () => {
    const mod: object = await vi.importActual('next-auth/react');
    return {
      ...mod,
      useSession: () => ({
        data: {
          user: { user: 'Usuario', email: 'user@gmail.com' },
        },
      }),
      signOut: () => {
        return Promise.resolve(undefined);
      },
    };
  });

  it('should render', (): void => {
    render(<Home />);
  });
  it('should render title correctly', (): void => {
    render(<Home />);

    screen.getByText('Chefier');
  });
<<<<<<< HEAD
=======
  it('should render register button', (): void => {
    render(<Home />);

    screen.getByTestId('register-button');
    screen.getByText('Register');
  });
  it('should render log out button', (): void => {
    render(<Home />);

    screen.getByTestId('logout-button');
    screen.getByText('Log out');
    fireEvent.click(screen.getByTestId('logout-button'));
  });
>>>>>>> develop
});
