"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserUtils {
}
exports.default = UserUtils;
_a = UserUtils;
UserUtils.buildUserDocument = async (request) => {
    if (request.body.username.length > 20) {
        request.body.username = request.body.username.substring(0, 10).trim();
    }
    let username = request.body.username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/ /g, '_');
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
    const email = request.body.email;
    const userData = { username, email };
    if (request.body.image)
        userData['image'] = request.body.image;
    if (request.body.password) {
        const password = await bcrypt_1.default.hash(request.body.password, 10);
        userData['password'] = password;
    }
    const user = new user_1.User(userData);
    return user;
};
UserUtils.isValidUpdate = (update) => {
    const allowedUpdates = [
        'likes',
        'saved',
        'recipes',
        'following',
        'followers',
    ];
    const updateEntries = Object.entries(update);
    const actualUpdates = updateEntries.map((entry) => {
        if (entry[0] === '$push' || entry[0] === '$pull') {
            if (typeof entry[1] === 'object' && entry[1] !== null) {
                return Object.keys(entry[1])[0];
            }
        }
        return entry[0];
    });
    return actualUpdates.every((update) => allowedUpdates.includes(update));
};
