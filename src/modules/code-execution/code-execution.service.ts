import { Inject, Injectable } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { RsaUtil } from 'src/shared/utils/rsa.utils';
import {
  CodeSubmissionRequest,
  CodeSubmissionResponse,
} from './dto/code-submission';
import { BaseRepository } from 'src/shared/database/repository';
import { CodeSubmissions } from './entities/CodeSubmissions';

@Injectable()
export class CodeExecutionService {
  constructor(
    private executionClient: CodeExecutionApiClient,
    private rsaUtil: RsaUtil,
    @Inject('CODESUBMISSIONS_REPO')
    private readonly submissionRepo: BaseRepository<CodeSubmissions>,
  ) {}

  async SubmitCode(request: CodeSubmissionRequest): Promise<string> {
    //decode the source code
    const { source_code, language_id, stdin } = request;

    request.source_code = this.rsaUtil.toBase64(source_code);
    request.stdin = this.rsaUtil.toBase64(stdin);

    //submit execution request
    const submissionRecord = this.submissionRepo.create({
      createdAt: Date.now(),
      //languageCode: language_id,
    });
    // request.source_code = encCode;//
    const submissionRes = await this.executionClient.SubmitCode(
      request,
      true,
      false,
    );

    //submit code execution result

    //return result
    return submissionRes.post_execution_filesystem;
  }
}
