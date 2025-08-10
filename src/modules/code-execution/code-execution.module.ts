import { Module } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { CodeExecutionService } from './code-execution.service';

@Module({
  exports: [CodeExecutionApiClient, CodeExecutionService],
  imports: [CodeExecutionApiClient, CodeExecutionService],
})
export class CodeExecutionModule {}
