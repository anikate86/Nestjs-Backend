import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from '../../src/ingestion/ingestion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingestion, IngestionStatus } from '../../src/ingestion/ingestion.entity';
import { Repository } from 'typeorm';

describe('IngestionService', () => {
  let service: IngestionService;
  let repo: jest.Mocked<Repository<Ingestion>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: getRepositoryToken(Ingestion),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
    repo = module.get(getRepositoryToken(Ingestion));
  });

  it('should trigger ingestion', async () => {
    const mockTask = { id: 1, status: IngestionStatus.PENDING } as Ingestion;

    repo.create.mockReturnValue(mockTask);
    repo.save.mockResolvedValue(mockTask);

    const result = await service.triggerIngestion(1);
    expect(repo.create).toHaveBeenCalledWith({
      document: { id: 1 },
      status: IngestionStatus.PENDING,
    });
    expect(result).toEqual(mockTask);
  });

  it('should return all ingestion tasks', async () => {
    const mockTasks = [{ id: 1 }, { id: 2 }] as Ingestion[];
    repo.find.mockResolvedValue(mockTasks);

    const result = await service.getAllTasks();
    expect(result).toEqual(mockTasks);
  });

  it('should get task by id', async () => {
    const mockTask = { id: 42 } as Ingestion;
    repo.findOne.mockResolvedValue(mockTask);

    const result = await service.getTaskById(42);
    expect(result).toEqual(mockTask);
  });

  it('should update status', async () => {
    const mockTask = { id: 1, status: IngestionStatus.PENDING } as Ingestion;
    repo.findOne.mockResolvedValue(mockTask);
    repo.save.mockResolvedValue({ ...mockTask, status: IngestionStatus.COMPLETED });

    const result = await service.updateStatus(1, IngestionStatus.COMPLETED);
    expect(result?.status).toBe(IngestionStatus.COMPLETED);
  });

  it('should return null if task to update not found', async () => {
    repo.findOne.mockResolvedValue(null);
    const result = await service.updateStatus(99, IngestionStatus.FAILED);
    expect(result).toBeNull();
  });
});
