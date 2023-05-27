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
// Function to verify token
const verifyToken = async ({ response, request }, next) => {
    if (request.headers.provider !== 'credentials' &&
        request.headers.provider !== 'google' &&
        request.headers.provider !== 'github') {
        APIUtils_1.default.setResponse(response, 401, {
            error: 'Invalid provider',
            request: request.body,
        });
        return;
    }
    const bearerHeader = request.headers.authorization;
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (request.headers.provider === 'credentials') {
            if (verifyCredentials(token, request, response))
                return next();
        }
        else if (request.headers.provider === 'google') {
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
};
exports.verifyToken = verifyToken;
// Function to verify credentials token
function verifyCredentials(token, request, response) {
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return true;
    }
    catch (error) {
        APIUtils_1.default.setResponse(response, 401, {
            error: { message: 'Invalid credentials token', error },
            request: request.body,
        });
        return false;
    }
}
// Function to verify google token
async function verifyGoogle(token, request, response) {
    const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, '');
    return await client
        .verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    })
        .then(() => {
        return;
    })
        .catch((error) => {
        APIUtils_1.default.setResponse(response, 401, {
            error: { message: 'Invalid google token', error },
            request: request.body,
        });
        throw new Error();
    });
}
// Function to verify github token
async function verifyGithub(token, request, response) {
    return await axios_1.default
        .post(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`, {
        access_token: token,
    }, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        auth: {
            username: process.env.GITHUB_CLIENT_ID,
            password: process.env.GITHUB_CLIENT_SECRET,
        },
    })
        .then(() => {
        return;
    })
        .catch((error) => {
        APIUtils_1.default.setResponse(response, 401, {
            error: { message: 'Invalid GitHub token', error },
            request: request.body,
        });
        throw new Error();
    });
}
