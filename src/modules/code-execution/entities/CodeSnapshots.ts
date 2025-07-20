import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Sessions } from "./Sessions";
import { Users } from "./Users";
import { Languages } from "./Languages";

@Index("code_snapshots_pkey", ["id"], { unique: true })
@Entity("code_snapshots", { schema: "public" })
export class CodeSnapshots {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "code", nullable: true })
  code: string | null;

  @Column("timestamp with time zone", { name: "taken_at", nullable: true })
  takenAt: Date | null;

  @ManyToOne(() => Sessions, (sessions) => sessions.codeSnapshots)
  @JoinColumn([{ name: "session_id", referencedColumnName: "id" }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.codeSnapshots)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Languages, (languages) => languages.codeSnapshots)
  @JoinColumn([{ name: "language_code", referencedColumnName: "code" }])
  languageCode: Languages;
}
