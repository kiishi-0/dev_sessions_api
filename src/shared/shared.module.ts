import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BaseRepository } from './database/repository';
import { HttpClientService } from './utils/httpClient';
import { RsaUtil } from './utils/rsa.utils';
import { Users } from 'src/modules/user/entities/Users';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/modules/user/entities/Roles';
import { SessionParticipantRoles } from 'src/modules/session/entities/SessionParticipantRoles';
import { SessionParticipants } from 'src/modules/session/entities/SessionParticipants';
import { Sessions } from 'src/modules/session/entities/Sessions';
import { CodeSnapshots } from 'src/modules/code-execution/entities/CodeSnapshots';
import { CodeSubmissions } from 'src/modules/code-execution/entities/CodeSubmissions';
import { EditorEventLogs } from 'src/modules/editor/entities/EditorEventLogs';
import { ExecutionResults } from 'src/modules/code-execution/entities/ExecutionResults';
import { Languages } from 'src/modules/editor/entities/Languages';
import { Repository } from 'typeorm';

// const repositories__: Provider[] = [
//   {
//     provide: 'UserRepository',
//     useFactory: (repo) => new BaseRepository<Users>(repo),
//     inject: [getRepositoryToken(Users)],
//   },
//   // {
//   //   provide: 'RolesRepository',
//   //   useFactory: (repo) => new BaseRepository<Roles>(repo),
//   //   inject: [getRepositoryToken(Roles)],
//   // },
//   {
//     provide: 'SessionParticipantRolesRepository',
//     useFactory: (repo) => new BaseRepository<SessionParticipantRoles>(repo),
//     inject: [getRepositoryToken(SessionParticipantRoles)],
//   },
//   {
//     provide: 'SessionParticipantsRepository',
//     useFactory: (repo) => new BaseRepository<SessionParticipants>(repo),
//     inject: [getRepositoryToken(SessionParticipants)],
//   },
//   {
//     provide: 'SessionsRepository',
//     useFactory: (repo) => new BaseRepository<Sessions>(repo),
//     inject: [getRepositoryToken(Sessions)],
//   },
//   {
//     provide: 'CodeSnapshotsRepository',
//     useFactory: (repo) => new BaseRepository<CodeSnapshots>(repo),
//     inject: [getRepositoryToken(CodeSnapshots)],
//   },
//   {
//     provide: 'CodeSubmissionsRepository',
//     useFactory: (repo) => new BaseRepository<CodeSubmissions>(repo),
//     inject: [getRepositoryToken(CodeSubmissions)],
//   },
//   {
//     provide: 'EditorEventLogsRepository',
//     useFactory: (repo) => new BaseRepository<EditorEventLogs>(repo),
//     inject: [getRepositoryToken(EditorEventLogs)],
//   },
//   {
//     provide: 'ExecutionResultsRepository',
//     useFactory: (repo) => new BaseRepository<ExecutionResults>(repo),
//     inject: [getRepositoryToken(ExecutionResults)],
//   },
//   {
//     provide: 'LanguagesRepository',
//     useFactory: (repo) => new BaseRepository<Languages>(repo),
//     inject: [getRepositoryToken(Languages)],
//   },
// ];
const entities = [
  Users,
  Roles,
  SessionParticipantRoles,
  SessionParticipants,
  Sessions,
  CodeSnapshots,
  CodeSubmissions,
  EditorEventLogs,
  ExecutionResults,
  Languages,
];
export const repositories: Provider[] = entities.map((entity) => ({
  provide: `${entity.name.toUpperCase()}_REPO`,
  useFactory: (repo: Repository<any>) => new BaseRepository(repo),
  inject: [getRepositoryToken(entity)],
}));

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([...entities])],
  providers: [...repositories, HttpClientService, RsaUtil],
  exports: [...repositories, HttpClientService, RsaUtil],
})
export class SharedModule {}
