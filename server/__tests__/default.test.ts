import request from 'supertest';
import { app } from '../src/app';
import { describe, it, vi } from 'vitest';

const server = app.listen();

describe('Default router', (): void => {
  vi.mock('imagekit', async () => {
    return {
      default: vi.fn().mockImplementation(() => ({
        default: () => ({
          deleteFile: () => ({}),
        }),
      })),
    };
  });

  it('should be not implemented', async () => {
    await request(server).get('').send().expect(501);
  });
});
