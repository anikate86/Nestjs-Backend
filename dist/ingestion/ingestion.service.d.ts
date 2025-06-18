import { Repository } from "typeorm";
import { Ingestion, IngestionStatus } from "./ingestion.entity";
export declare class IngestionService {
    private ingestionRepo;
    constructor(ingestionRepo: Repository<Ingestion>);
    triggerIngestion(documentId: number): Promise<Ingestion>;
    updateStatus(id: number, status: IngestionStatus, errorMessage?: string): Promise<Ingestion | null>;
    getAllTasks(): Promise<Ingestion[]>;
    getTaskById(id: number): Promise<Ingestion | null>;
    getTaskByDocId(documentId: number): Promise<Ingestion[]>;
}
