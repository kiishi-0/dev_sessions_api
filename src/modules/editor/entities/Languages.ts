import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CodeSnapshots } from '../../code-execution/entities/CodeSnapshots';
import { CodeSubmissions } from '../../code-execution/entities/CodeSubmissions';
import { Sessions } from '../../session/entities/Sessions';

@Index('languages_code_key', ['code'], { unique: true })
@Index('languages_pkey', ['id'], { unique: true })
@Entity('languages', { schema: 'public' })
export class Languages {
  @PrimaryGeneratedColumn('uuid') // ✅ Change this line
  id: string;

  @Column('character varying', { name: 'language', length: 100 })
  language: string;

  @Column('character varying', { name: 'code', unique: true, length: 50 })
  code: string;

  @Column('integer', { name: 'language_id' })
  language_id: Number;

  @OneToMany(() => CodeSnapshots, (codeSnapshots) => codeSnapshots.languageCode)
  codeSnapshots: CodeSnapshots[];

  @OneToMany(
    () => CodeSubmissions,
    (codeSubmissions) => codeSubmissions.languageCode,
  )
  codeSubmissions: CodeSubmissions[];

  @OneToMany(() => Sessions, (sessions) => sessions.languageCode)
  sessions: Sessions[];
}
