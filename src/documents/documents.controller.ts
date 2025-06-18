// src/documents/documents.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("documents")
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly docService: DocumentsService) {}

  @Post()
  create(@Request() req, @Body() body) {
    const ownerId = req.user.userId; // Extract owner ID from JWT
    console.log("ownerId--", ownerId);
    return this.docService.create({ ...body, owner: { id: ownerId } });
  }

  @Get()
  findMine(@Request() req) {
    return this.docService.findByUser(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.docService.findById(id);
  }

  @Post("user/email")
  findByEmail(@Body("email") email: string) {
    console.log("---emaill-----", email);
    return this.docService.findByEmail(email);
  }
  @Put(":id")
  update(@Param("id") id: number, @Body() body) {
    return this.docService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.docService.delete(id);
  }
}
