import { UploadResponse } from 'imagekit/dist/libs/interfaces';
export default class APIUtils {
    static setResponse: (response: any, status: number, body: any) => void;
    static buildUserDocument: (request: any) => Promise<import("../models/user").UserDocumentInterface>;
    static uploadImage: (image: string, name: string, folder: string) => Promise<UploadResponse>;
    static deleteImage: (fileID: string) => Promise<void>;
    static isValidUserUpdate: (update: any) => boolean;
    static isValidRecipeUpdate: (update: any) => boolean;
    static getAggregateSearch: (searchTerms: string) => {
        index: string;
        compound: {
            filter: object[];
        };
    };
    static getAggregateMatch: (filters: any) => {
        $and: object[];
    };
}
