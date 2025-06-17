// src/documents/documents.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly docService: DocumentsService) {}

  @Post()
  create(@Request() req, @Body() body) {
    return this.docService.create({ ...body, owner: req.user });
  }

  @Get()
  findMine(@Request() req) {
    return this.docService.findByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.docService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.docService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.docService.delete(id);
  }
}
