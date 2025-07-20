import { Column, Entity, Index, OneToMany } from "typeorm";
import { CodeSnapshots } from "./CodeSnapshots";
import { CodeSubmissions } from "./CodeSubmissions";
import { Sessions } from "./Sessions";

@Index("languages_code_key", ["code"], { unique: true })
@Index("languages_pkey", ["id"], { unique: true })
@Entity("languages", { schema: "public" })
export class Languages {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "language", length: 100 })
  language: string;

  @Column("character varying", { name: "code", unique: true, length: 50 })
  code: string;

  @OneToMany(() => CodeSnapshots, (codeSnapshots) => codeSnapshots.languageCode)
  codeSnapshots: CodeSnapshots[];

  @OneToMany(
    () => CodeSubmissions,
    (codeSubmissions) => codeSubmissions.languageCode
  )
  codeSubmissions: CodeSubmissions[];

  @OneToMany(() => Sessions, (sessions) => sessions.languageCode)
  sessions: Sessions[];
}
