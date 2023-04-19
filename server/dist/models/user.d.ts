import { Document, Schema } from 'mongoose';
export interface UserDocumentInterface extends Document {
    username: string;
    nickname: string;
    description: string;
    registerDate: Date;
    birthdate: Date;
    image: string;
    email: string;
    password: string;
    following: [string];
    followers: [string];
    recipes: [string];
    likes: [string];
    saved: [string];
}
export declare const UserSchema: Schema<UserDocumentInterface, import("mongoose").Model<UserDocumentInterface, any, any>, undefined, {}>;
export declare const User: import("mongoose").Model<UserDocumentInterface, {}, {}>;
