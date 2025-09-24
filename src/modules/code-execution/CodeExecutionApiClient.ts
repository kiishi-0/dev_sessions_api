import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from 'src/shared/utils/httpClient';
import {
  CodeExecutionApiSubmitResult,
  CodeSubmissionResponse,
} from './dto/code-submission';

@Injectable()
export class CodeExecutionApiClient {
  private apiUrl: string;
  constructor(
    private httpClient: HttpClientService,
    private configService: ConfigService,
  ) {
    this.apiUrl = configService.get<string>('CODE_EXECUTION_URL') || '';
  }

  async SubmitCode(
    request: any,
    wait: true,
    base64_encoded: false,
  ): Promise<CodeExecutionApiSubmitResult> {
    //specify variables

    var response = await this.httpClient.post<CodeExecutionApiSubmitResult>(
      `${this.apiUrl}submissions`,
      request,
      {
        wait: wait,
        base64_encoded: base64_encoded,
      },
      {
        'x-rapidapi-key': this.configService.get<string>('JUDGE_API_KEY') || '',
        'x-rapidapi-host':
          this.configService.get<string>('JUDGE_API_HOST') || '',
        'Content-Type': 'application/json',
      },
    );
    //make request to API
    //return response
    return { ...response };
  }
}
