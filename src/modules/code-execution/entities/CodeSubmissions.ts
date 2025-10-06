import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { ExecutionResults } from './ExecutionResults';
import { Sessions } from 'src/modules/session/entities/Sessions';
import { Users } from 'src/modules/user/entities/Users';
import { Languages } from 'src/modules/editor/entities/Languages';
// import { Sessions } from "./Sessions";
// import { Users } from "./Users";
// import { Languages } from "./Languages";

@Index('code_submissions_pkey', ['id'], { unique: true })
@Entity('code_submissions', { schema: 'public' })
export class CodeSubmissions {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('text', { name: 'source_code', nullable: true })
  sourceCode: string | null;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(
    () => ExecutionResults,
    (executionResults) => executionResults.codeSubmissions,
  )
  @JoinColumn([{ name: 'result_id', referencedColumnName: 'id' }])
  result: ExecutionResults;

  @ManyToOne(() => Sessions, (sessions) => sessions.codeSubmissions)
  @JoinColumn([{ name: 'session_id', referencedColumnName: 'id' }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.codeSubmissions)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(() => Languages, (languages) => languages.codeSubmissions)
  @JoinColumn([{ name: 'language_code', referencedColumnName: 'code' }])
  languageCode: Languages;

  @OneToMany(
    () => ExecutionResults,
    (executionResults) => executionResults.codeSubmission,
  )
  executionResults: ExecutionResults[];

  //@RelationId((codeSubmission: CodeSubmissions) => codeSubmission.session)
  @Column('uuid', { name: 'session_id', nullable: true })
  sessionId: string;

  // @RelationId((codeSubmission: CodeSubmissions) => codeSubmission.user)
  @Column('uuid', { name: 'user_id', nullable: true })
  userId: string;

  //@RelationId((codeSubmission: CodeSubmissions) => codeSubmission.languageCode)
  @Column('varchar', { name: 'language_code', nullable: true })
  languageCodeId: string;

  //@RelationId((codeSubmission: CodeSubmissions) => codeSubmission.result)
  @Column('uuid', { name: 'result_id', nullable: true })
  resultId: string;
}
