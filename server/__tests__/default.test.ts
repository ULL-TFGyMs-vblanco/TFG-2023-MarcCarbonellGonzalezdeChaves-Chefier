import request from 'supertest';
import { app } from '../src/app';
import { describe, it } from '../../node_modules/vitest';

const server = app.listen();

describe('Default router', (): void => {
  it('should be not implemented', async () => {
    await request(server).get('').send().expect(501);
  });
});
