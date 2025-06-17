import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { Ingestion } from './ingestion.entity';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  // Trigger ingestion manually
  @Post('trigger')
  triggerIngestion(@Body() body: { documentId: number }): Promise<Ingestion> {
    return this.ingestionService.triggerIngestion(body.documentId);
  }

  // List all ingestion tasks
  @Get()
  getAll(): Promise<Ingestion[]> {
    return this.ingestionService.getAllTasks();
  }

  // Get a specific ingestion task by ID
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<Ingestion | null> {
    return this.ingestionService.getTaskById(id);
  }
}
