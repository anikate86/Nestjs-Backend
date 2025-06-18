import { Document } from '../documents/document.entity';
export declare enum IngestionStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}
export declare class Ingestion {
    id: number;
    document: Document;
    errorMessage?: string;
    status: IngestionStatus;
    createdAt: Date;
}
