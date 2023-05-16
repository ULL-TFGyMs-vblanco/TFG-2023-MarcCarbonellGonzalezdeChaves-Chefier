import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import APIUtils from '../utils/APIUtils';
import UserUtils from '../utils/UserUtils';

// Register a user
export const register = async ({ response, request }: Context) => {
  if (!request.body.username || !request.body.email) {
    APIUtils.setResponse(response, 400, {
      error: 'Email and username are required',
      request: request.body,
    });
    return;
  }
  const user = await UserUtils.buildUserDocument(request);
  await User.create(user)
    .then((user) => {
      APIUtils.setResponse(response, 200, { user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errors = Object.keys(err.errors).map((key) => {
          return { message: err.errors[key].message, field: key };
        });
        APIUtils.setResponse(response, 400, {
          error: { message: err._message, errors: errors },
          request: request.body,
        });
      } else if (err.code && err.code === 11000) {
        APIUtils.setResponse(response, 400, {
          error: {
            message: 'Duplicated credential.',
            errors: [
              {
                message: `An account with that ${Object.keys(
                  err.keyValue
                )} already exists.`,
                field: Object.keys(err.keyValue)[0],
              },
            ],
          },
          request: request.body,
        });
      } else {
        APIUtils.setResponse(response, 500, {
          error: { message: 'Error registering user', error: err },
          request: request.body,
        });
      }
    });
};

// Log in a user
export const login = async ({ response, request }: Context) => {
  if (!request.body.email || !request.body.password) {
    APIUtils.setResponse(response, 400, {
      error: 'Email and password are required',
      request: request.body,
    });
    return;
  }
  await User.findOne({
    email: request.body.email,
  })
    .then(async (user) => {
      if (
        user &&
        (await bcrypt.compare(request.body.password, user.password))
      ) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
          expiresIn: '86400s',
        });
        APIUtils.setResponse(response, 200, {
          name: user.username,
          email: user.email,
          image: user.image,
          accessToken: token,
        });
      } else {
        APIUtils.setResponse(response, 404, {
          error: 'Incorrect email or password',
          request: request.body,
        });
      }
    })
    .catch((err) => {
      APIUtils.setResponse(response, 500, {
        error: { message: 'Error logging in', error: err },
        request: request.body,
      });
    });
};

// Get a user's data by username
export const getUser = async ({ response, request }: Context, filter: any) => {
  await User.findOne(filter, ['-password', '-email', '-__v'])
    .then((user) => {
      if (user) {
        APIUtils.setResponse(response, 200, user);
      } else {
        APIUtils.setResponse(response, 404, {
          error: 'User not found',
          request: request.body,
        });
      }
    })
    .catch((err) => {
      APIUtils.setResponse(response, 500, {
        error: { message: 'Error retrieving user', error: err },
        requerequest: request.body,
      });
    });
};

// Update a user's data
export const updateUser = async (
  { response, request, params }: Context,
  options: { multiple: boolean } = { multiple: false }
) => {
  if (!UserUtils.isValidUpdate(request.body.update)) {
    APIUtils.setResponse(response, 400, {
      error: { message: 'Update is not permitted' },
      request: request.body,
    });
  } else {
    try {
      if (options.multiple) {
        const result = await User.updateMany(params, request.body.update, {
          new: true,
          runValidators: true,
        });
        APIUtils.setResponse(response, 200, result);
      } else {
        if (!params.id) {
          APIUtils.setResponse(response, 400, {
            error: { message: 'An id must be provided' },
            request: request.body,
          });
        } else {
          const element = await User.findByIdAndUpdate(
            params.id,
            request.body.update,
            {
              new: true,
              runValidators: true,
              upsert: true,
            }
          );
          if (!element) {
            APIUtils.setResponse(response, 404, {
              error: { message: 'User not found' },
              request: request.body,
            });
          } else {
            APIUtils.setResponse(response, 200, element);
          }
        }
      }
    } catch (err) {
      APIUtils.setResponse(response, 500, {
        error: {
          message: 'Error updating the user',
          error: err,
        },
        request: request.body,
      });
    }
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUser,
};
