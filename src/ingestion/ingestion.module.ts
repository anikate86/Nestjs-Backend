import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from './ingestion.entity';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingestion])], // ✅ Only register entity classes
  providers: [IngestionService],
  controllers: [IngestionController],
})
export class IngestionModule {}
