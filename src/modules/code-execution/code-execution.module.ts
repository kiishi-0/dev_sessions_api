import { Module } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { CodeExecutionService } from './code-execution.service';
import { SharedModule } from 'src/shared/shared.module';
import { CodeExecutionController } from './code-execution.controller';

@Module({
  exports: [CodeExecutionApiClient, CodeExecutionService],
  providers: [CodeExecutionService, CodeExecutionApiClient],
  controllers: [CodeExecutionController],
  imports: [SharedModule],
})
export class CodeExecutionModule {}
