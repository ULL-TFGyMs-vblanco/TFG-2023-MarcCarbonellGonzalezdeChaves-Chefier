"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const imagekit_1 = __importDefault(require("imagekit"));
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
    // Google and Github users have image but don't have passwords
    if (request.body.image) {
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
        const image = request.body.image;
        const user = new user_1.User({ username, email, image });
        return user;
        // Credential users have password but don't have image
    }
    else {
        const username = request.body.username
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/ /g, '_');
        const password = await bcrypt_1.default.hash(request.body.password, 10);
        const user = new user_1.User({ username, email, password });
        return user;
    }
};
APIUtils.uploadImage = async (image, name, folder) => {
    const imagekit = new imagekit_1.default({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
    return imagekit
        .upload({
        file: image,
        fileName: name.replace(/ /g, '_'),
        folder: folder,
        useUniqueFileName: true,
    })
        .then((result) => {
        return result;
    })
        .catch((error) => {
        throw new Error(error);
    });
};
APIUtils.deleteImage = async (fileID) => {
    const imagekit = new imagekit_1.default({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    });
    return imagekit
        .deleteFile(fileID)
        .then(() => {
        return;
    })
        .catch((error) => {
        throw new Error(error);
    });
};
APIUtils.isValidUserUpdate = (update) => {
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
APIUtils.isValidRecipeUpdate = (update) => {
    const allowedUpdates = ['likes', 'saved', 'valorations'];
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
APIUtils.getAggregateSearch = (searchTerms) => {
    const search = {
        index: 'default',
        compound: {
            filter: [],
        },
    };
    search.compound.filter.push({
        text: {
            query: searchTerms,
            path: {
                wildcard: '*',
            },
            fuzzy: { maxEdits: 2, prefixLength: 3 },
        },
    });
    return search;
};
APIUtils.getAggregateMatch = (filters) => {
    const match = { $and: [] };
    Object.keys(filters).forEach((filter) => {
        if (filter === 'cookTime' || filter === 'averageRating') {
            const limits = filters[filter].split('-').map((limit) => {
                return parseInt(limit);
            });
            const filterObject = {};
            filterObject[filter] = {
                $gte: limits[0],
                $lte: limits[1],
            };
            match.$and.push(filterObject);
        }
        else if (filter === 'tags') {
            const tags = {
                Desayuno: 'breakfast',
                Almuerzo: 'lunch',
                Cena: 'dinner',
                Postre: 'dessert',
                Picoteo: 'snack',
                Bebida: 'drink',
            };
            Object.keys(tags).forEach((tag) => {
                if (filters.tags.includes(tag)) {
                    const filterObject = {};
                    filterObject[`tags.${tags[tag]}`] = tag;
                    match.$and.push(filterObject);
                }
            });
        }
        else if (filter === 'likes' ||
            filter === 'saved' ||
            filter === 'following') {
            const filterObject = {};
            filterObject[filter] = {
                $in: [filters[filter]],
            };
            match.$and.push(filterObject);
        }
        else {
            const filterObject = {};
            filterObject[filter] = filters[filter];
            match.$and.push(filterObject);
        }
    });
    return match;
};
