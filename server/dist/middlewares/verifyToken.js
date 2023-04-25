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
                verifyGoogle(token, next, request, response);
            }
            else {
                verifyGithub(token, next, request, response);
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
        APIUtils_1.default.setResponse(response, 401, { error, request: request.body });
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
            APIUtils_1.default.setResponse(response, 500, {
                error: res,
                request: request.body,
            });
            return;
        }
    })
        .catch((error) => {
        APIUtils_1.default.setResponse(response, 401, { error, request: request.body });
    });
}
// import axios from 'axios';
// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import { Context, Next } from 'koa';
// import ctx from '../utils/APIUtils';
// export const verifyToken = async (
//   { response, request }: Context,
//   next: Next
// ) => {
//   if (
//     request.body.provider !== 'credentials' &&
//     request.body.provider !== 'google' &&
//     request.body.provider !== 'github'
//   ) {
//     ctx.setResponse(response, 401, {
//       error: 'Invalid provider',
//       request: request.body,
//     });
//   } else {
//     const bearerHeader = request.headers.authorization;
//     if (bearerHeader) {
//       const token = bearerHeader.split(' ')[1];
//       if (request.body.provider === 'credentials') {
//         try {
//           jwt.verify(token, process.env.JWT_SECRET as string);
//           return next();
//         } catch (error: any) {
//           ctx.setResponse(response, 401, {
//             error,
//             request: request.body,
//           });
//         }
//       } else if (request.body.provider === 'google') {
//         const client = new OAuth2Client(process.env.CLIENT_ID);
//         try {
//           await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.CLIENT_ID,
//           });
//           return next();
//         } catch (error: any) {
//           ctx.setResponse(response, 401, { error, request: request.body });
//         }
//       } else {
//         try {
//           const res = await axios.post(
//             `https://api.github.com/aplications/${process.env.GITHUB_CLIENT_ID}/token`,
//             {
//               access_token: token,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (res.status === 200) {
//             return next();
//           } else {
//             ctx.setResponse(response, 500, {
//               error: res,
//               request: request.body,
//             });
//           }
//         } catch (error: any) {
//           ctx.setResponse(response, 401, { error, request: request.body });
//         }
//       }
//     } else {
//       ctx.setResponse(response, 401, {
//         error: 'An access token must be provided',
//         request: request.body,
//       });
//     }
//   }
// };
