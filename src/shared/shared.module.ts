import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BaseRepository } from './database/repository';
import { HttpClientService } from './utils/httpClient';
import { RsaUtil } from './utils/rsa.utils';

@Module({
  imports: [DatabaseModule],
  providers: [BaseRepository, HttpClientService, RsaUtil],
  exports: [BaseRepository, HttpClientService, RsaUtil],
})
export class SharedModule {}
