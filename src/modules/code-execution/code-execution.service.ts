import { Injectable } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';

@Injectable
export class CodeExecutionService {
  constructor(private executionClient: CodeExecutionApiClient) {}

  async SubmitCode(request: any) {
    this.executionClient.SubmitCode(request, true, false);
  }
}
