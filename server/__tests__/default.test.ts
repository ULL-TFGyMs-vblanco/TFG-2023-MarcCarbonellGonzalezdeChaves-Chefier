import request from 'supertest';
import   { server } from '../src/index';
import { describe, it } from '../../node_modules/vitest'

/**
* Ruta por defecto
*/
describe('Ruta por defecto', (): void => {
  it('Should be not implemented', async () => {
    await request(server).get('').send().expect(501);
  })
})