import { DocumentsService } from "./documents.service";
export declare class DocumentsController {
    private readonly docService;
    constructor(docService: DocumentsService);
    create(req: any, body: any): Promise<import("./document.entity").Document>;
    findMine(req: any): Promise<import("./document.entity").Document[]>;
    findOne(id: number): Promise<import("./document.entity").Document | null>;
    findByEmail(email: string): Promise<import("./document.entity").Document[]>;
    update(id: number, body: any): Promise<import("./document.entity").Document | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
