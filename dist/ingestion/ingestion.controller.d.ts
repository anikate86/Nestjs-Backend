import { IngestionService } from "./ingestion.service";
import { Ingestion } from "./ingestion.entity";
export declare class IngestionController {
    private readonly ingestionService;
    constructor(ingestionService: IngestionService);
    triggerIngestion(body: {
        documentId: number;
    }): Promise<Ingestion>;
    getAll(): Promise<Ingestion[]>;
    getById(id: number): Promise<Ingestion | null>;
    getByDocId(documentId: number): Promise<Ingestion[]>;
}
