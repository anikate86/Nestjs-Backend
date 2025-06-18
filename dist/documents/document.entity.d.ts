import { User } from '../users/user.entity';
import { Ingestion } from 'src/ingestion/ingestion.entity';
export declare class Document {
    id: number;
    title: string;
    content: string;
    owner: User;
    ingestions: Ingestion[];
}
