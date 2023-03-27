import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { User } from '../models/user';

// Register a user
export const register = async ({ response, request }: Context) => {
  if (!request.body.username || !request.body.email) {
    response.status = 400;
    response.body = {
      error: 'Email and username are required',
      request: request.body,
    };
    return;
  }
  const user = new User(request.body);
  try {
    await user.save();
    response.status = 200;
    response.body = { user };
    return;
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      response.status = 400;
      const errors = Object.keys(err.errors).map((key) => {
        return { error: err.errors[key].message, field: key };
      });
      response.body = {
        error: { message: err._message, errors: errors },
        request: request.body,
      };
    } else if (err.code && err.code === 11000) {
      response.status = 400;
      response.body = {
        error: {
          message: 'Duplicated credential',
          errors: {
            error: `An account with that ${Object.keys(
              err.keyValue
            )} already exists`,
            field: Object.keys(err.keyValue)[0],
          },
        },
        request: request.body,
      };
    } else {
      response.status = 500;
      response.body = { error: err, request: request.body };
    }
    return;
  }
};

// Log in a user
export const login = async ({ response, request }: Context) => {
  if (!request.body.email || !request.body.password) {
    response.status = 400;
    response.body = {
      error: 'Email and password are required',
      request: request.body,
    };
    return;
  }
  try {
    const user = await User.findOne({
      email: request.body.email,
      password: request.body.password,
    });
    if (user) {
      try {
        const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
          expiresIn: '1s',
        });
        response.status = 200;
        response.body = { user, accessToken: token };
        return;
      } catch (error) {
        response.status = 500;
        response.body = { error, request: request.body };
        return;
      }
    } else {
      response.status = 404;
      response.body = {
        error: 'Incorrect email or password',
        request: request.body,
      };
      return;
    }
  } catch (error) {
    response.status = 500;
    response.body = { error, request: request.body };
    return;
  }
};

module.exports = {
  register,
  login,
};
