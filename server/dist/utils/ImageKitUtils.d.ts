import { UploadResponse } from 'imagekit/dist/libs/interfaces';
export default class ImageKitUtils {
    static uploadImage: (image: string, name: string, folder: string) => Promise<UploadResponse>;
    static deleteImage: (fileID: string) => Promise<void>;
}
