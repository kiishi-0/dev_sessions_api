import { Injectable } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { RsaUtil } from 'src/shared/utils/rsa.utils';
import {
  CodeSubmissionRequest,
  CodeSubmissionResponse,
} from './dto/code-submission';

@Injectable()
export class CodeExecutionService {
  constructor(
    private executionClient: CodeExecutionApiClient,
    private rsaUtil: RsaUtil,
  ) {}

  async SubmitCode(request: CodeSubmissionRequest): Promise<string> {
    //decode the source code
    const { source_code, language_id, stdin } = request;

    request.source_code = this.rsaUtil.toBase64(source_code);
    request.stdin = this.rsaUtil.toBase64(stdin);
    // request.source_code = encCode;//
    const submissionRes = await this.executionClient.SubmitCode(
      request,
      true,
      false,
    );

    //return result
    return submissionRes.post_execution_filesystem;
  }
}
