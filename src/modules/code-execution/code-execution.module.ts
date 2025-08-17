import { Module } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { CodeExecutionService } from './code-execution.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  exports: [CodeExecutionApiClient, CodeExecutionService],
  providers: [CodeExecutionService, CodeExecutionApiClient],
  imports: [SharedModule],
})
export class CodeExecutionModule {}
