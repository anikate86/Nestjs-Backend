import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Document } from '../documents/document.entity';

export enum IngestionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Document, (document) => document.ingestions, { eager: true })
  document!: Document;

  @Column({ nullable: true })
  errorMessage?: string;

  @Column({
    type: 'enum',
    enum: IngestionStatus,
    default: IngestionStatus.PENDING,
  })
  status!: IngestionStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
