import APIUtils from '../src/utils/APIUtils';
import { describe, expect, it } from 'vitest';

describe('API utils', (): void => {
  it('should set response', async () => {
    const response = {
      status: 0,
      body: 0,
    };
    APIUtils.setResponse(response, 200, 'body');
    expect(response).toEqual({
      status: 200,
      body: 'body',
    });
  });
});
