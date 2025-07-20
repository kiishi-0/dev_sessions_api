import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CodeSnapshots } from "./CodeSnapshots";
import { CodeSubmissions } from "./CodeSubmissions";
import { EditorEventLogs } from "./EditorEventLogs";
import { ExecutionResults } from "./ExecutionResults";
import { SessionParticipants } from "./SessionParticipants";
import { Sessions } from "./Sessions";
import { Roles } from "./Roles";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("text", { name: "password_hash", nullable: true })
  passwordHash: string | null;

  @Column("character varying", { name: "firstname", length: 100 })
  firstname: string;

  @Column("character varying", { name: "lastname", length: 100 })
  lastname: string;

  @Column("text", { name: "avatar_url", nullable: true })
  avatarUrl: string | null;

  @OneToMany(() => CodeSnapshots, (codeSnapshots) => codeSnapshots.user)
  codeSnapshots: CodeSnapshots[];

  @OneToMany(() => CodeSubmissions, (codeSubmissions) => codeSubmissions.user)
  codeSubmissions: CodeSubmissions[];

  @OneToMany(() => EditorEventLogs, (editorEventLogs) => editorEventLogs.user)
  editorEventLogs: EditorEventLogs[];

  @OneToMany(
    () => ExecutionResults,
    (executionResults) => executionResults.user
  )
  executionResults: ExecutionResults[];

  @OneToMany(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.user
  )
  sessionParticipants: SessionParticipants[];

  @OneToMany(() => Sessions, (sessions) => sessions.host)
  sessions: Sessions[];

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
  roleCode: Roles;
}
