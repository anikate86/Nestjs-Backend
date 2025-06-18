import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDocumentDto {
  @ApiPropertyOptional({ example: 'Updated Title', description: 'Updated title of the document' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content', description: 'Updated document content' })
  @IsOptional()
  @IsString()
  content?: string;
}
