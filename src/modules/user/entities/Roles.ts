import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Users } from './Users';

@Index('roles_code_key', ['code'], { unique: true })
@Index('roles_pkey', ['id'], { unique: true })
@Entity('roles', { schema: 'public' })
export class Roles {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'code', unique: true, length: 50 })
  code: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @OneToMany(() => Users, (users) => users.roleCode)
  users: Users[];
}
