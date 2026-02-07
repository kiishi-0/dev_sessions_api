import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CodeSubmissions } from './CodeSubmissions';
// import { Sessions } from '../../../entities/entities/Sessions';
import { Users } from '../../user/entities/Users';
import { Sessions } from 'src/modules/session/entities/Sessions';

@Index('execution_results_pkey', ['id'], { unique: true })
@Entity('execution_results', { schema: 'public' })
export class ExecutionResults {
  @PrimaryGeneratedColumn('uuid') // ✅ Change this line
  id: string;

  @Column('text', { name: 'stdout', nullable: true })
  stdout: string | null;

  @Column('text', { name: 'stderr', nullable: true })
  stderr: string | null;

  @Column('integer', { name: 'exit_code' })
  exitCode: number;

  @Column('double precision', { name: 'time_taken_ms', precision: 53 })
  timeTakenMs: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('integer', { name: 'memory', default: 0 })
  memory: number;

  @Column('text', { name: 'compile_output', default: '' })
  compileOutput: string;

  @Column('text', { name: 'response_message', default: '' })
  responseMessage: string;

  @Column('text', { name: 'status_message', default: '' })
  statusMessage: string;

  @OneToMany(() => CodeSubmissions, (codeSubmissions) => codeSubmissions.result)
  codeSubmissions: CodeSubmissions[];

  @ManyToOne(
    () => CodeSubmissions,
    (codeSubmissions) => codeSubmissions.executionResults,
  )
  @JoinColumn([{ name: 'code_submission_id', referencedColumnName: 'id' }])
  codeSubmission: CodeSubmissions;

  @ManyToOne(() => Sessions, (sessions) => sessions.executionResults)
  @JoinColumn([{ name: 'session_id', referencedColumnName: 'id' }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.executionResults)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @Column('uuid', { name: 'session_id', nullable: false })
  sessionId: string;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;

  @Column('uuid', { nullable: false, name: 'code_submission_id' })
  codeSubmissionId: string;
}
