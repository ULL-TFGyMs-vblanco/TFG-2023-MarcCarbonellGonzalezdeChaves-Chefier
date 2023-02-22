import request from 'supertest';
import   { server } from '../src/index';
import { describe, it } from 'vitest'

/**
* Ruta por defecto
*/
describe('Ruta por defecto', () => {
  it('Should be not implemented', async () => {
    await request(server).get('').send().expect(501);
  })
})