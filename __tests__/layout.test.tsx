import { describe, it, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Layout } from '../src/components/Layout';
import { MockImageProps } from '../src/types/test';

describe('Layout', (): void => {
  afterEach(cleanup);

  vi.mock('next/image', async () => {
    return {
      default: () =>
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
        },
    };
  });

  it('should render', (): void => {
    render(
      <Layout>
        <p>Components</p>
      </Layout>
    );
    screen.getByText('Components');
  });
});
