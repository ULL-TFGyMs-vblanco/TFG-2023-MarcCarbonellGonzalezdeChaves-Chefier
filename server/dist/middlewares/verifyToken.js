"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CtxUtils_1 = __importDefault(require("../utils/CtxUtils"));
const verifyToken = async ({ response, request }, next) => {
    if (request.body.provider !== 'credentials' &&
        request.body.provider !== 'google' &&
        request.body.provider !== 'github') {
        CtxUtils_1.default.setResponse(response, 401, {
            error: 'Invalid provider',
            request: request.body,
        });
    }
    else {
        const bearerHeader = request.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            if (request.body.provider === 'credentials') {
                verifyCredentials(token, next, request, response);
            }
            else if (request.body.provider === 'google') {
                verifyGoogle(token, next, request, response);
            }
            else {
                verifyGithub(token, next, request, response);
            }
        }
        else {
            CtxUtils_1.default.setResponse(response, 401, {
                error: 'An access token must be provided',
                request: request.body,
            });
        }
    }
};
exports.verifyToken = verifyToken;
function verifyCredentials(token, next, request, response) {
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch (error) {
        CtxUtils_1.default.setResponse(response, 401, {
            error,
            request: request.body,
        });
        return;
    }
}
async function verifyGoogle(token, next, request, response) {
    const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
    await client
        .verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    })
        .then(() => {
        return next();
    })
        .catch((error) => {
        CtxUtils_1.default.setResponse(response, 401, { error, request: request.body });
    });
}
async function verifyGithub(token, next, request, response) {
    await axios_1.default
        .post(`https://api.github.com/aplications/${process.env.GITHUB_CLIENT_ID}/token`, {
        access_token: token,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
        if (res.status === 200) {
            return next();
        }
        else {
            CtxUtils_1.default.setResponse(response, 500, {
                error: res,
                request: request.body,
            });
            return;
        }
    })
        .catch((error) => {
        CtxUtils_1.default.setResponse(response, 401, { error, request: request.body });
    });
}
