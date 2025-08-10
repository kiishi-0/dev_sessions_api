import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BaseRepository } from './database/repository';
import { HttpClientService } from './utils/httpClient';

@Module({
  imports: [DatabaseModule, BaseRepository, HttpClientService],
  exports: [DatabaseModule, BaseRepository, HttpClientService],
})
export class SharedModule {}
