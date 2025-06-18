import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { IngestionService } from "./ingestion.service";
import { Ingestion } from "./ingestion.entity";
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("ingestion")
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  // Trigger ingestion manually
  @Post("trigger")
  @ApiOperation({ summary: "Ingestion is triggered" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        documentId: {
          type: "string",
          example: "2",
        },
      },
      required: ["documentId"],
    },
  })
  @ApiResponse({
    status: 201,
    description: "The document ingestion has been successfully created.",
  })
  triggerIngestion(@Body() body: { documentId: number }): Promise<Ingestion> {
    return this.ingestionService.triggerIngestion(body.documentId);
  }

  // List all ingestion tasks
  @Get()
  getAll(): Promise<Ingestion[]> {
    return this.ingestionService.getAllTasks();
  }

  // Get a specific ingestion task by ID
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number): Promise<Ingestion | null> {
    return this.ingestionService.getTaskById(id);
  }

  // Get a specific ingestion task by documentId
  @Get("doc/:documentId")
  getByDocId(
    @Param("documentId", ParseIntPipe) documentId: number
  ): Promise<Ingestion[]> {
    return this.ingestionService.getTaskByDocId(documentId);
  }
}
