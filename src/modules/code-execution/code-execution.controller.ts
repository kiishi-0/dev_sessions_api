import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';
import {
  CodeSubmissionRequest,
  CodeSubmissionResponse,
} from './dto/code-submission';
import { ApiResponse } from 'src/shared/dtos/api.result';
import { response } from 'express';

@Controller()
export class CodeExecutionController {
  constructor(private readonly codeService: CodeExecutionService) {}

  @Post('code-execution/submit-code')
  async SubmitCode(
    @Body() request: CodeSubmissionRequest,
  ): Promise<ApiResponse<CodeSubmissionResponse>> {
    const response = await this.codeService.SubmitCode(request);
    return {
      ResponseCode: HttpStatus.OK,
      Data: response,
      Message: 'Code submitted successfully',
    };
  }
}
