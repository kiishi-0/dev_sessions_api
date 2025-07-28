import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../../modules/user/entities/Users';
import { Roles } from '../../modules/user/entities/Roles';
import { SessionParticipants } from '../../modules/session/entities/SessionParticipants';
import { Sessions } from '../../modules/session/entities/Sessions';
import { SessionParticipantRoles } from '../../modules/session/entities/SessionParticipantRoles';
import { EditorEventLogs } from 'src/modules/editor/entities/EditorEventLogs';
import { Languages } from 'src/modules/editor/entities/Languages';
import { CodeSnapshots } from 'src/modules/code-execution/entities/CodeSnapshots';
import { CodeSubmissions } from 'src/modules/code-execution/entities/CodeSubmissions';
import { ExecutionResults } from 'src/modules/code-execution/entities/ExecutionResults';

//import { YourEntity } from './entities/your.entity'; // Replace with your actual entity

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Users,
          Roles,
          SessionParticipantRoles,
          SessionParticipants,
          Sessions,
          CodeSnapshots,
          CodeSubmissions,
          SessionParticipants,
          EditorEventLogs,
          ExecutionResults,
          Languages,
        ],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([]),
  ],
  exports: [],
})
export class DatabaseModule {}

// useFactory: (): TypeOrmModuleOptions => ({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'your_postgres_username',
//   password: 'password',
//   database: 'TestDb',
//   entities: [], // or use __dirname + '/**/*.entity{.ts,.js}'
//   synchronize: true, // only for development!
// }
