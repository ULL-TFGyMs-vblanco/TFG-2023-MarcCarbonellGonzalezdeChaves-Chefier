export default class UserUtils {
    static buildUserDocument: (request: any) => Promise<import("../models/user").UserDocumentInterface>;
    static isValidUpdate: (update: any) => boolean;
}
