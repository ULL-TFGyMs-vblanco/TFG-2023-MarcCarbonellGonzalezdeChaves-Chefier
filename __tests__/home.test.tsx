import { describe, it, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('Home', (): void => {
  afterEach(cleanup);

  it('should render', (): void => {
    render(<Home />);
  });
  it('should render title correctly', (): void => {
    render(<Home />);

    screen.getByText('Chefier');
  });
});
