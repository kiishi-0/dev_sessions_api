import { Column, Entity, Index } from "typeorm";

@Index("test_db_PK", ["id"], { unique: true })
@Entity("test_table ", { schema: "public" })
export class TestTable {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "user_name", array: true })
  userName: string[];

  @Column("text", { name: "password_hash", array: true })
  passwordHash: string[];
}
