import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CodeSnapshots } from '../../code-execution/entities/CodeSnapshots';
import { CodeSubmissions } from '../../code-execution/entities//CodeSubmissions';
import { EditorEventLogs } from '../../editor/entities/EditorEventLogs';
import { ExecutionResults } from '../../code-execution/entities/ExecutionResults';
import { SessionParticipants } from './SessionParticipants';
import { Users } from '../../user/entities/Users';
import { Languages } from '../../editor/entities/Languages';

@Index('sessions_pkey', ['id'], { unique: true })
@Entity('sessions', { schema: 'public' })
export class Sessions {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('boolean', { name: 'is_active', nullable: true })
  isActive: boolean | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'ended_at', nullable: true })
  endedAt: Date | null;

  @OneToMany(() => CodeSnapshots, (codeSnapshots) => codeSnapshots.session)
  codeSnapshots: CodeSnapshots[];

  @OneToMany(
    () => CodeSubmissions,
    (codeSubmissions) => codeSubmissions.session,
  )
  codeSubmissions: CodeSubmissions[];

  @OneToMany(
    () => EditorEventLogs,
    (editorEventLogs) => editorEventLogs.session,
  )
  editorEventLogs: EditorEventLogs[];

  @OneToMany(
    () => ExecutionResults,
    (executionResults) => executionResults.session,
  )
  executionResults: ExecutionResults[];

  @OneToMany(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.session,
  )
  sessionParticipants: SessionParticipants[];

  @ManyToOne(() => Users, (users) => users.sessions)
  @JoinColumn([{ name: 'host_id', referencedColumnName: 'id' }])
  host: Users;

  @ManyToOne(() => Languages, (languages) => languages.sessions)
  @JoinColumn([{ name: 'language_code', referencedColumnName: 'code' }])
  languageCode: Languages;
}
