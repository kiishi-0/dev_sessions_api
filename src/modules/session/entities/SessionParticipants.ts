import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Sessions } from '../entities/Sessions';
import { Users } from '../../user/entities/Users';
import { SessionParticipantRoles } from './SessionParticipantRoles';

@Index('session_participants_pkey', ['id'], { unique: true })
@Entity('session_participants', { schema: 'public' })
export class SessionParticipants {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('timestamp with time zone', { name: 'joined_at', nullable: true })
  joinedAt: Date | null;

  @ManyToOne(() => Sessions, (sessions) => sessions.sessionParticipants)
  @JoinColumn([{ name: 'session_id', referencedColumnName: 'id' }])
  session: Sessions;

  @ManyToOne(() => Users, (users) => users.sessionParticipants)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @ManyToOne(
    () => SessionParticipantRoles,
    (sessionParticipantRoles) => sessionParticipantRoles.sessionParticipants,
  )
  @JoinColumn([{ name: 'role_code', referencedColumnName: 'code' }])
  roleCode: SessionParticipantRoles;
}
