import { User } from '../src/models/user';
import UserUtils from '../src/utils/UserUtils';
import { describe, expect, it, vi } from 'vitest';

describe('User utils', (): void => {
  User.findOne = vi.fn().mockResolvedValue(null);
  it('should build user document with image', async () => {
    const request = {
      body: {
        email: 'email',
        image: 'image',
        username: 'username1234567891234',
      },
    };
    const user = await UserUtils.buildUserDocument(request);
    expect(user.email).toEqual('email');
    expect(user.image).toEqual('image');
    expect(user.username).toEqual('username12');
  });
  it('should build user document with password', async () => {
    const request = {
      body: {
        email: 'email',
        username: 'username1234567891234',
        password: 'password',
      },
    };
    const user = await UserUtils.buildUserDocument(request);
    expect(user.email).toEqual('email');
    expect(user.image).toEqual(
      'https://ik.imagekit.io/czvxqgafa/images/avatar_default.jpg'
    );
    expect(user.username).toEqual('username12');
  });
  it('should return true as update is valid', async () => {
    const update = {
      likes: '123',
      $push: { saved: '123' },
      recipes: '123',
    };
    const isValid = UserUtils.isValidUpdate(update);
    expect(isValid).toBe(true);
  });
  it('should return false as update is not valid', async () => {
    const update = {
      likes: '123',
      $push: { saved: '123' },
      recipes: '123',
      invalid: '123',
    };
    const isValid = UserUtils.isValidUpdate(update);
    expect(isValid).toBe(false);
  });
});
