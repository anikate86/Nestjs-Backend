import { Document } from '../documents/document.entity';
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    documents: Document[];
}
