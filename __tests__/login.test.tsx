import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Login from '../src/pages/auth/login';

describe('Login', (): void => {
  afterEach(cleanup);

  vi.mock('next/router', async () => {
    return {
      useRouter: () => ({ query: { error: undefined } }),
    };
  });

  it('should render', (): void => {
    render(<Login />);
  });
  it('should render form', (): void => {
    render(<Login />);

    screen.getByText('Log In');
  });
});
