import { Column, Entity, Index, OneToMany } from "typeorm";
import { SessionParticipants } from "./SessionParticipants";

@Index("session_participant_roles_code_key", ["code"], { unique: true })
@Index("session_participant_roles_pkey", ["id"], { unique: true })
@Entity("session_participant_roles", { schema: "public" })
export class SessionParticipantRoles {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "code", unique: true, length: 50 })
  code: string;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @OneToMany(
    () => SessionParticipants,
    (sessionParticipants) => sessionParticipants.roleCode
  )
  sessionParticipants: SessionParticipants[];
}
