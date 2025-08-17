import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from 'src/shared/utils/httpClient';
import {
  CodeExecutionApiResult,
  CodeSubmissionResponse,
} from './dto/code-submission';

@Injectable()
export class CodeExecutionApiClient {
  private apiUrl: string;
  constructor(
    private httpClient: HttpClientService,
    configService: ConfigService,
  ) {
    this.apiUrl = configService.get<string>('CODE_EXECUTION_URL') || '';
  }

  async SubmitCode(
    request: any,
    wait: true,
    base64_encoded: false,
  ): Promise<CodeExecutionApiResult> {
    //specify variables

    var response = this.httpClient.post<CodeExecutionApiResult>(
      `${this.apiUrl}submissions`,
      request,
      {
        wait: wait,
        base64_encoded: base64_encoded,
      },
    );
    //make request to API
    //return response
    return { ...response };
  }
}
