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
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";

@Controller("documents")
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly docService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new document" })
  @ApiBody({ type: CreateDocumentDto })
  @ApiResponse({
    status: 201,
    description: "The document has been successfully created.",
  })
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
  @ApiOperation({ summary: "Find Document by email" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "user@example.com",
        },
      },
      required: ["email"],
    },
  })
  @ApiResponse({
    status: 201,
    description: "The document has been successfully fetched.",
  })
  findByEmail(@Body("email") email: string) {
    console.log("---emaill-----", email);
    return this.docService.findByEmail(email);
  }
  @Put(":id")
  @ApiOperation({ summary: "update a new document" })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({
    status: 201,
    description: "The document has been successfully updated.",
  })
  update(@Param("id") id: number, @Body() body) {
    return this.docService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.docService.delete(id);
  }
}
