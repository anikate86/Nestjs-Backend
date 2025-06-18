// src/documents/documents.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "./document.entity";
import { Repository } from "typeorm";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepo: Repository<Document>
  ) {}

  async create(data: Partial<Document>) {
    const doc = this.documentRepo.create(data); // sets owner as { id: ... }
    return await this.documentRepo.save(doc);
  }

  async findByUser(userId: number) {
    return this.documentRepo.find({
      where: { owner: { id: userId } },
      relations: ["owner"], // ✅ include the owner relation
    });
  }

  async findById(id: number) {
    return this.documentRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.documentRepo
      .createQueryBuilder("document")
      .leftJoinAndSelect("document.owner", "owner")
      .where("owner.email = :email", { email })
      .getMany();
  }

  async update(id: number, data: Partial<Document>) {
    await this.documentRepo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return this.documentRepo.delete(id);
  }
}
