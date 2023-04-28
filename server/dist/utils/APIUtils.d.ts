import { UploadResponse } from 'imagekit/dist/libs/interfaces';
export default class APIUtils {
    static setResponse: (response: any, status: number, body: any) => void;
    static buildUserDocument: (request: any) => Promise<import("../models/user").UserDocumentInterface>;
    static uploadImage: (image: string, name: string, folder: string) => Promise<UploadResponse>;
    static deleteImage: (fileID: string) => Promise<void>;
}
