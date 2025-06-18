import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from '../../src/documents/documents.controller';
import { DocumentsService } from '../../src/documents/documents.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let service: DocumentsService;

  const mockDocService = {
    create: jest.fn(),
    findByUser: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        { provide: DocumentsService, useValue: mockDocService },
      ],
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should create a document', async () => {
    mockDocService.create.mockResolvedValue({ id: 1, title: 'test' });
    const req = { user: { id: 1 } };
    const body = { title: 'test' };
    const result = await controller.create(req, body);
    expect(result).toEqual({ id: 1, title: 'test' });
  });

  it('should get user documents', async () => {
    mockDocService.findByUser.mockResolvedValue([{ id: 1 }]);
    const result = await controller.findMine({ user: { id: 1 } });
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should get a document by id', async () => {
    mockDocService.findById.mockResolvedValue({ id: 1 });
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1 });
  });

  it('should update a document', async () => {
    mockDocService.update.mockResolvedValue({ id: 1, title: 'updated' });
    const result = await controller.update(1, { title: 'updated' });
    expect(result).toEqual({ id: 1, title: 'updated' });
  });

  it('should delete a document', async () => {
    mockDocService.delete.mockResolvedValue({ affected: 1 });
    const result = await controller.remove(1);
    expect(result).toEqual({ affected: 1 });
  });
});
