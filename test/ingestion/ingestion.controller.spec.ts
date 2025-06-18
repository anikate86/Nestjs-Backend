import { Test, TestingModule } from "@nestjs/testing";
import { IngestionController } from "../../src/ingestion/ingestion.controller";
import { IngestionService } from "../../src/ingestion/ingestion.service";
import {
  Ingestion,
  IngestionStatus,
} from "../../src/ingestion/ingestion.entity";

describe("IngestionController", () => {
  let controller: IngestionController;

  let mockService: {
    triggerIngestion: jest.Mock;
    getAllTasks: jest.Mock;
    getTaskById: jest.Mock;
  };

  beforeEach(async () => {
    mockService = {
      triggerIngestion: jest.fn(),
      getAllTasks: jest.fn(),
      getTaskById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<IngestionController>(IngestionController);
  });

  it("should trigger ingestion and return a task", async () => {
    const mockTask: Ingestion = {
      id: 1,
      document: { id: 10 } as any,
      errorMessage: undefined,
      status: IngestionStatus.PENDING,
      createdAt: new Date(),
    };

    mockService.triggerIngestion.mockResolvedValue(mockTask);

    const result = await controller.triggerIngestion({ documentId: 10 });
    expect(result).toEqual(mockTask);
    expect(mockService.triggerIngestion).toHaveBeenCalledWith(10);
  });

  it("should return all ingestion tasks", async () => {
    const mockTasks: Ingestion[] = [
      {
        id: 1,
        document: { id: 10 } as any,
        errorMessage: undefined,
        status: IngestionStatus.PENDING,
        createdAt: new Date(),
      },
    ];

    mockService.getAllTasks.mockResolvedValue(mockTasks);

    const result = await controller.getAll();
    expect(result).toEqual(mockTasks);
  });

  it("should return a specific ingestion task by ID", async () => {
    const mockTask: Ingestion = {
      id: 1,
      document: { id: 10 } as any,
      errorMessage: undefined,
      status: IngestionStatus.PENDING,
      createdAt: new Date(),
    };

    mockService.getTaskById.mockResolvedValue(mockTask);

    const result = await controller.getById(1);
    expect(result).toEqual(mockTask);
    expect(mockService.getTaskById).toHaveBeenCalledWith(1);
  });
});
