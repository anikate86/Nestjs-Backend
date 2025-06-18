import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentDto {
  @ApiProperty({ example: "My Document", description: "Title of the document" })
  @IsString()
  title: string;

  @ApiProperty({
    example: "This is the document content.",
    description: "Main content of the document",
  })
  @IsString()
  content: string;
}
