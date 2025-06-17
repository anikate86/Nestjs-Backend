// src/documents/document.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Ingestion } from 'src/ingestion/ingestion.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => User, (user) => user.documents)
  owner!: User;

  @OneToMany(() => Ingestion, (ingestion) => ingestion.document)
  ingestions!: Ingestion[];
}
