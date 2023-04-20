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
exports.getUser = exports.login = exports.register = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_1 = require("../models/user");
const CtxUtils_1 = __importDefault(require("../utils/CtxUtils"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Register a user
const register = async ({ response, request }) => {
    if (!request.body.username || !request.body.email) {
        CtxUtils_1.default.setResponse(response, 400, {
            error: 'Email and username are required',
            request: request.body,
        });
        return;
    }
    const email = request.body.email;
    const username = request.body.username.toLowerCase().replace(/ /g, '_');
    let user = new user_1.User({ username, email });
    if (request.body.image) {
        const image = request.body.image;
        user = new user_1.User({ username, email, image });
    }
    else if (request.body.password) {
        const password = await bcrypt_1.default.hash(request.body.password, 10);
        user = new user_1.User({ username, email, password });
    }
    await user_1.User.create(user)
        .then((user) => {
        CtxUtils_1.default.setResponse(response, 200, { user });
    })
        .catch((err) => {
        if (err.name === 'ValidationError') {
            const errors = Object.keys(err.errors).map((key) => {
                return { message: err.errors[key].message, field: key };
            });
            CtxUtils_1.default.setResponse(response, 400, {
                error: { message: err._message, errors: errors },
                request: request.body,
            });
        }
        else if (err.code && err.code === 11000) {
            CtxUtils_1.default.setResponse(response, 400, {
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
            CtxUtils_1.default.setResponse(response, 500, {
                error: { message: err },
                request: request.body,
            });
        }
    });
};
exports.register = register;
// Log in a user
const login = async ({ response, request }) => {
    if (!request.body.email || !request.body.password) {
        CtxUtils_1.default.setResponse(response, 400, {
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
            CtxUtils_1.default.setResponse(response, 200, {
                name: user.username,
                email: user.email,
                image: user.image,
                accessToken: token,
            });
        }
        else {
            CtxUtils_1.default.setResponse(response, 404, {
                error: 'Incorrect email or password',
                request: request.body,
            });
        }
    })
        .catch((err) => {
        CtxUtils_1.default.setResponse(response, 500, {
            error: err,
            request: request.body,
        });
    });
};
exports.login = login;
// Get a user's data by username
const getUser = async ({ response, request }, filter) => {
    await user_1.User.findOne(filter, ['-password', '-saved', '-email', '-__v'])
        .then((user) => {
        if (user) {
            CtxUtils_1.default.setResponse(response, 200, user);
        }
        else {
            CtxUtils_1.default.setResponse(response, 404, {
                error: 'User not found',
                request: request.body,
            });
        }
    })
        .catch((err) => {
        CtxUtils_1.default.setResponse(response, 500, {
            error: err,
            requerequest: request.body,
        });
    });
};
exports.getUser = getUser;
module.exports = {
    register: exports.register,
    login: exports.login,
    getUser: exports.getUser,
};
