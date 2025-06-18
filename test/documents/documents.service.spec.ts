import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../../src/documents/documents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from '../../src/documents/document.entity';
import { Repository } from 'typeorm';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let repo: Repository<Document>;

  const mockDocumentRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((doc) => Promise.resolve({ id: 1, ...doc })),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useValue: mockDocumentRepo,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    repo = module.get<Repository<Document>>(getRepositoryToken(Document));
  });

  it('should create a document', async () => {
    const result = await service.create({ title: 'Test Doc' });
    expect(result).toEqual({ id: 1, title: 'Test Doc' });
    expect(repo.save).toHaveBeenCalled();
  });

  it('should find documents by user', async () => {
    mockDocumentRepo.find.mockResolvedValue([{ id: 1 }]);
    const result = await service.findByUser(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should find document by id', async () => {
    mockDocumentRepo.findOne.mockResolvedValue({ id: 1 });
    const result = await service.findById(1);
    expect(result).toEqual({ id: 1 });
  });

  it('should update a document', async () => {
    const mockDoc = { id: 1, title: 'Updated' };
    mockDocumentRepo.findOne.mockResolvedValue(mockDoc);
    const result = await service.update(1, { title: 'Updated' });
    expect(result).toEqual(mockDoc);
  });

  it('should delete a document', async () => {
    mockDocumentRepo.delete.mockResolvedValue({ affected: 1 });
    const result = await service.delete(1);
    expect(result).toEqual({ affected: 1 });
  });
});
