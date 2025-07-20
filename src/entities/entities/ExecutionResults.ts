import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CodeSubmissions } from "./CodeSubmissions";
import { Sessions } from "./Sessions";
import { Users } from "./Users";

@Index("execution_results_pkey", ["id"], { unique: true })
@Entity("execution_results", { schema: "public" })
export class ExecutionResults {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "stdout", nullable: true })
  stdout: string | null;

  @Column("text", { name: "stderr", nullable: true })
  stderr: string | null;

  @Column("integer", { name: "exit_code" })
  exitCode: number;

  @Column("double precision", { name: "time_taken_ms", precision: 53 })
  timeTakenMs: number;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @OneToMany(() => CodeSubmissions, (codeSubmissions) => codeSubmissions.result)
  codeSubmissions: CodeSubmissions[];

  @ManyToOne(
    () => CodeSubmissions,
    (codeSubmissions) => codeSubmissions.executionResults
  )
  @JoinColumn([{ name: "code_submission_id", referencedColumnName: "id" }])
  codeSubmission: CodeSubmissions;

  @ManyToOne(() => Sessions, (sessions) => sessions.executionResults)
  @JoinColumn([{ name: "session_id", referencedColumnName: "id" }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.executionResults)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
