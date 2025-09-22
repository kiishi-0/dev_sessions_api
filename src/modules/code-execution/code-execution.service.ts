import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CodeExecutionApiClient } from './CodeExecutionApiClient';
import { RsaUtil } from 'src/shared/utils/rsa.utils';
import {
  CodeSubmissionRequest,
  CodeSubmissionResponse,
} from './dto/code-submission';
import { BaseRepository } from 'src/shared/database/repository';
import { CodeSubmissions } from './entities/CodeSubmissions';
import { ExecutionResults } from './entities/ExecutionResults';
import { Languages } from '../editor/entities/Languages';
import { DevSessionException } from 'src/shared/exceptions/devsessions.exception';

@Injectable()
export class CodeExecutionService {
  constructor(
    private executionClient: CodeExecutionApiClient,
    private rsaUtil: RsaUtil,
    @Inject('CODESUBMISSIONS_REPO')
    private readonly submissionRepo: BaseRepository<CodeSubmissions>,
    @Inject('EXECUTIONRESULTS_REPO')
    private readonly execResultRepo: BaseRepository<ExecutionResults>,
    @Inject('LANGUAGES_REPO')
    private readonly languagesRepo: BaseRepository<Languages>,
  ) {}

  async SubmitCode(request: CodeSubmissionRequest): Promise<string> {
    //decode the source code
    const { source_code, language_id, stdin } = request;

    request.source_code = this.rsaUtil.toBase64(source_code);
    request.stdin = this.rsaUtil.toBase64(stdin);

    const language = await this.languagesRepo.getFirstOrDefault({
      language_id: language_id,
    });
    if (language == null || language == undefined) {
      throw new DevSessionException(
        'Invalid language selected',
        HttpStatus.BAD_REQUEST,
      );
    }

    //submit execution request
    const submissionRecord = await this.submissionRepo.create({
      createdAt: Date.now(),
      languageCode: language,
      sourceCode: request.source_code,
    });

    // request.source_code = encCode;//
    const submissionRes = await this.executionClient.SubmitCode(
      request,
      true,
      false,
    );

    //submit code execution result
    const executionResultRecord = await this.execResultRepo.create({
      createdAt: Date.now(),
      codeSubmission: submissionRecord,
      exitCode: submissionRes.exit_code,
      stderr:
        submissionRes.stderr == null
          ? null
          : this.rsaUtil.fromBase64(submissionRes.stderr),
      stdout: this.rsaUtil.fromBase64(submissionRes.stdout),
      timeTakenMs: Number(submissionRes.time),
    });
    //return result
    return submissionRes.post_execution_filesystem;
  }
}
