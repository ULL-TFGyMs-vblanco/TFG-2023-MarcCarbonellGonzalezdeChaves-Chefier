"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const axios_1 = __importDefault(require("axios"));
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APIUtils_1 = __importDefault(require("../utils/APIUtils"));
const verifyToken = async ({ response, request }, next) => {
    if (request.body.provider !== 'credentials' &&
        request.body.provider !== 'google' &&
        request.body.provider !== 'github') {
        APIUtils_1.default.setResponse(response, 401, {
            error: 'Invalid provider',
            request: request.body,
        });
    }
    else {
        const bearerHeader = request.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            if (request.body.provider === 'credentials') {
                if (verifyCredentials(token, request, response))
                    return next();
            }
            else if (request.body.provider === 'google') {
                try {
                    await verifyGoogle(token, request, response);
                    return next();
                }
                catch (error) {
                    return;
                }
            }
            else {
                try {
                    await verifyGithub(token, request, response);
                    return next();
                }
                catch (error) {
                    return;
                }
            }
        }
        else {
            APIUtils_1.default.setResponse(response, 401, {
                error: 'An access token must be provided',
                request: request.body,
            });
        }
    }
};
exports.verifyToken = verifyToken;
function verifyCredentials(token, request, response) {
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return true;
    }
    catch (error) {
        APIUtils_1.default.setResponse(response, 401, {
            error,
            request: request.body,
        });
        return false;
    }
}
async function verifyGoogle(token, request, response) {
    const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
    return await client
        .verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    })
        .then(() => {
        return;
    })
        .catch((error) => {
        APIUtils_1.default.setResponse(response, 401, {
            error,
            request: request.body,
        });
        throw new Error();
    });
}
async function verifyGithub(token, request, response) {
    return await axios_1.default
        .post(`https://api.github.com/aplications/${process.env.GITHUB_CLIENT_ID}/token`, {
        access_token: token,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(() => {
        return;
    })
        .catch((error) => {
        APIUtils_1.default.setResponse(response, 401, { error, request: request.body });
        throw new Error();
    });
}
