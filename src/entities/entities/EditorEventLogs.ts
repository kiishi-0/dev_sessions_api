import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Sessions } from "./Sessions";
import { Users } from "./Users";

@Index("editor_event_logs_pkey", ["id"], { unique: true })
@Entity("editor_event_logs", { schema: "public" })
export class EditorEventLogs {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "event_type",
    nullable: true,
    length: 100,
  })
  eventType: string | null;

  @Column("json", { name: "payload", nullable: true })
  payload: object | null;

  @Column("timestamp with time zone", { name: "timestamp", nullable: true })
  timestamp: Date | null;

  @ManyToOne(() => Sessions, (sessions) => sessions.editorEventLogs)
  @JoinColumn([{ name: "session_id", referencedColumnName: "id" }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.editorEventLogs)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
