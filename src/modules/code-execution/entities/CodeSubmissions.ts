import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ExecutionResults } from "./ExecutionResults";
import { Sessions } from "./Sessions";
import { Users } from "./Users";
import { Languages } from "./Languages";

@Index("code_submissions_pkey", ["id"], { unique: true })
@Entity("code_submissions", { schema: "public" })
export class CodeSubmissions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "source_code", nullable: true })
  sourceCode: string | null;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @ManyToOne(
    () => ExecutionResults,
    (executionResults) => executionResults.codeSubmissions
  )
  @JoinColumn([{ name: "result_id", referencedColumnName: "id" }])
  result: ExecutionResults;

  @ManyToOne(() => Sessions, (sessions) => sessions.codeSubmissions)
  @JoinColumn([{ name: "session_id", referencedColumnName: "id" }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.codeSubmissions)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Languages, (languages) => languages.codeSubmissions)
  @JoinColumn([{ name: "language_code", referencedColumnName: "code" }])
  languageCode: Languages;

  @OneToMany(
    () => ExecutionResults,
    (executionResults) => executionResults.codeSubmission
  )
  executionResults: ExecutionResults[];
}
