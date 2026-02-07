import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sessions } from '../../session/entities/Sessions';
import { Users } from '../../user/entities/Users';
import { Languages } from '../../editor/entities/Languages';

@Index('code_snapshots_pkey', ['id'], { unique: true })
@Entity('code_snapshots', { schema: 'public' })
export class CodeSnapshots {
  @PrimaryGeneratedColumn('uuid') // ✅ Change this line
  id: string;

  @Column('text', { name: 'code', nullable: true })
  code: string | null;

  @Column('timestamp with time zone', { name: 'taken_at', nullable: true })
  takenAt: Date | null;

  @ManyToOne(() => Sessions, (sessions) => sessions.codeSnapshots)
  @JoinColumn([{ name: 'session_id', referencedColumnName: 'id' }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.codeSnapshots)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Languages, (languages) => languages.codeSnapshots)
  @JoinColumn([{ name: 'language_code', referencedColumnName: 'code' }])
  languageCode: Languages;
}
