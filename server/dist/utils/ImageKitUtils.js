"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const imagekit_1 = __importDefault(require("imagekit"));
// Utils for ImageKit
class ImageKitUtils {
}
exports.default = ImageKitUtils;
_a = ImageKitUtils;
// Function to upload image to ImageKit
ImageKitUtils.uploadImage = async (image, name, folder) => {
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
// Function to delete image from ImageKit
ImageKitUtils.deleteImage = async (fileID) => {
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
