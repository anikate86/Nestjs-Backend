import { Document } from "./document.entity";
import { Repository } from "typeorm";
export declare class DocumentsService {
    private documentRepo;
    constructor(documentRepo: Repository<Document>);
    create(data: Partial<Document>): Promise<Document>;
    findByUser(userId: number): Promise<Document[]>;
    findById(id: number): Promise<Document | null>;
    findByEmail(email: string): Promise<Document[]>;
    update(id: number, data: Partial<Document>): Promise<Document | null>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
