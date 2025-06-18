import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ingestion, IngestionStatus } from "./ingestion.entity";

@Injectable()
export class IngestionService {
  constructor(
    @InjectRepository(Ingestion)
    private ingestionRepo: Repository<Ingestion>
  ) {}

  async triggerIngestion(documentId: number): Promise<Ingestion> {
    const task = this.ingestionRepo.create({
      document: { id: documentId }, // 👈 assign relation
      status: IngestionStatus.PENDING,
    });
    return this.ingestionRepo.save(task);
  }

  async updateStatus(
    id: number,
    status: IngestionStatus,
    errorMessage?: string
  ) {
    const task = await this.ingestionRepo.findOne({ where: { id } });
    if (!task) return null;

    task.status = status;
    if (errorMessage) task.errorMessage = errorMessage;
    return this.ingestionRepo.save(task);
  }

  async getAllTasks(): Promise<Ingestion[]> {
    return this.ingestionRepo.find({ order: { createdAt: "DESC" } });
  }

  async getTaskById(id: number): Promise<Ingestion | null> {
    return this.ingestionRepo.findOne({ where: { id } });
  }
  async getTaskByDocId(documentId: number): Promise<Ingestion[]> {
    return this.ingestionRepo.find({ where: { document: { id: documentId } } });
  }
}
