"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.login = exports.register = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const APIUtils_1 = __importDefault(require("../utils/APIUtils"));
const UserUtils_1 = __importDefault(require("../utils/UserUtils"));
// Register a user
const register = async ({ response, request }) => {
    if (!request.body.username || !request.body.email) {
        APIUtils_1.default.setResponse(response, 400, {
            error: 'Email and username are required',
            request: request.body,
        });
        return;
    }
    const user = await UserUtils_1.default.buildUserDocument(request);
    await user_1.User.create(user)
        .then((user) => {
        APIUtils_1.default.setResponse(response, 200, { user });
    })
        .catch((err) => {
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map((key) => {
                return { message: err.errors[key].message, field: key };
            });
            APIUtils_1.default.setResponse(response, 400, {
                error: { message: err._message, errors: errors },
                request: request.body,
            });
        }
        else if (err.code && err.code === 11000) {
            APIUtils_1.default.setResponse(response, 400, {
                error: {
                    message: 'Duplicated credential.',
                    errors: [
                        {
                            message: `An account with that ${Object.keys(err.keyValue)} already exists.`,
                            field: Object.keys(err.keyValue)[0],
                        },
                    ],
                },
                request: request.body,
            });
        }
        else {
            APIUtils_1.default.setResponse(response, 500, {
                error: { message: 'Error registering user', error: err },
                request: request.body,
            });
        }
    });
};
exports.register = register;
// Log in a user
const login = async ({ response, request }) => {
    if (!request.body.email || !request.body.password) {
        APIUtils_1.default.setResponse(response, 400, {
            error: 'Email and password are required',
            request: request.body,
        });
        return;
    }
    await user_1.User.findOne({
        email: request.body.email,
    })
        .then(async (user) => {
        if (user &&
            (await bcrypt_1.default.compare(request.body.password, user.password))) {
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '86400s',
            });
            APIUtils_1.default.setResponse(response, 200, {
                name: user.username,
                email: user.email,
                image: user.image,
                accessToken: token,
            });
        }
        else {
            APIUtils_1.default.setResponse(response, 400, {
                error: 'Incorrect email or password',
                request: request.body,
            });
        }
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error logging in', error: err },
            request: request.body,
        });
    });
};
exports.login = login;
// Get a user's data by username
const getUser = async ({ response, request }, filter) => {
    await user_1.User.findOne(filter, ['-password', '-email', '-__v'])
        .then((user) => {
        if (user) {
            APIUtils_1.default.setResponse(response, 200, user);
        }
        else {
            APIUtils_1.default.setResponse(response, 404, {
                error: 'User not found',
                request: request.body,
            });
        }
    })
        .catch((err) => {
        APIUtils_1.default.setResponse(response, 500, {
            error: { message: 'Error retrieving user', error: err },
            request: request.body,
        });
    });
};
exports.getUser = getUser;
// Update a user's data
const updateUser = async ({ response, request, params }, options = { multiple: false }) => {
    if (!UserUtils_1.default.isValidUpdate(request.body.update)) {
        APIUtils_1.default.setResponse(response, 400, {
            error: 'Update is not permitted',
            request: request.body,
        });
    }
    else {
        try {
            if (options.multiple) {
                const { _id, username, email, image, password, nickname, description, ...filters } = params;
                const result = await user_1.User.updateMany(filters, request.body.update, {
                    new: true,
                    runValidators: true,
                });
                APIUtils_1.default.setResponse(response, 200, result);
            }
            else {
                if (!params.id) {
                    APIUtils_1.default.setResponse(response, 400, {
                        error: { message: 'An id must be provided' },
                        request: request.body,
                    });
                }
                else {
                    const element = await user_1.User.findByIdAndUpdate(params.id, request.body.update, {
                        new: true,
                        runValidators: true,
                    });
                    if (!element) {
                        APIUtils_1.default.setResponse(response, 404, {
                            error: 'User not found',
                            request: request.body,
                        });
                    }
                    else {
                        APIUtils_1.default.setResponse(response, 200, element);
                    }
                }
            }
        }
        catch (err) {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map((key) => {
                    return { message: err.errors[key].message, field: key };
                });
                APIUtils_1.default.setResponse(response, 400, {
                    error: { message: err._message, errors: errors },
                    request: request.body,
                });
            }
            else {
                APIUtils_1.default.setResponse(response, 500, {
                    error: { message: 'Error updating user', error: err },
                    request: request.body,
                });
            }
        }
    }
};
exports.updateUser = updateUser;
module.exports = {
    register: exports.register,
    login: exports.login,
    getUser: exports.getUser,
    updateUser: exports.updateUser,
};
