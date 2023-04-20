"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
class APIUtils {
}
exports.default = APIUtils;
_a = APIUtils;
APIUtils.setResponse = (response, status, body) => {
    response.status = status;
    response.body = body;
};
APIUtils.buildUserDocument = async (request) => {
    const email = request.body.email;
    let username = request.body.username.toLowerCase().replace(/ /g, '_');
    if (request.body.username.length > 20) {
        username = username.substring(0, 20);
    }
    let existingUser = await user_1.User.findOne({
        username: username,
    });
    let suffix = 1;
    while (existingUser) {
        existingUser = await user_1.User.findOne({
            username: username + suffix,
        });
        suffix++;
        if (!existingUser)
            username += suffix - 1;
    }
    let user = new user_1.User({ username, email });
    // Google and Github users have image but don't have passwords
    if (request.body.image) {
        let username = request.body.username.toLowerCase().replace(/ /g, '_');
        let existingUser = await user_1.User.findOne({
            username: username,
        });
        let suffix = 1;
        while (existingUser) {
            existingUser = await user_1.User.findOne({
                username: username + suffix,
            });
            suffix++;
            if (!existingUser)
                username += suffix - 1;
        }
        const image = request.body.image;
        user = new user_1.User({ username, email, image });
        // Credential users have password but don't have image
    }
    else if (request.body.password) {
        const username = request.body.username.toLowerCase().replace(/ /g, '_');
        const password = await bcrypt_1.default.hash(request.body.password, 10);
        user = new user_1.User({ username, email, password });
    }
    return user;
};
