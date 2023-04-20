export default class APIUtils {
    static setResponse: (response: any, status: number, body: any) => void;
    static buildUserDocument: (request: any) => Promise<import("../models/user").UserDocumentInterface>;
}
