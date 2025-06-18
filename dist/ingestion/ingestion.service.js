"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ingestion_entity_1 = require("./ingestion.entity");
let IngestionService = class IngestionService {
    constructor(ingestionRepo) {
        this.ingestionRepo = ingestionRepo;
    }
    async triggerIngestion(documentId) {
        const task = this.ingestionRepo.create({
            document: { id: documentId },
            status: ingestion_entity_1.IngestionStatus.PENDING,
        });
        return this.ingestionRepo.save(task);
    }
    async updateStatus(id, status, errorMessage) {
        const task = await this.ingestionRepo.findOne({ where: { id } });
        if (!task)
            return null;
        task.status = status;
        if (errorMessage)
            task.errorMessage = errorMessage;
        return this.ingestionRepo.save(task);
    }
    async getAllTasks() {
        return this.ingestionRepo.find({ order: { createdAt: "DESC" } });
    }
    async getTaskById(id) {
        return this.ingestionRepo.findOne({ where: { id } });
    }
    async getTaskByDocId(documentId) {
        return this.ingestionRepo.find({ where: { document: { id: documentId } } });
    }
};
exports.IngestionService = IngestionService;
exports.IngestionService = IngestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingestion_entity_1.Ingestion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map