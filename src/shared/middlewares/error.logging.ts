// error-logging.middleware.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../logger/log.util';
import { ErrorModel } from '../dtos/api.result';
import { DevSessionException } from '../exceptions/devsessions.exception';

@Injectable()
@Catch()
export class ErrorLoggingMiddleware implements ExceptionFilter {
  constructor(private readonly logger: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody: ErrorModel = {
      Message: 'Error processing your request',
      ResponseCode: status,
    };

    if (exception instanceof DevSessionException) {
      status = exception.getStatus();
      responseBody = exception.getResponse() as ErrorModel;

      this.logger.logInformation(
        `DEVSESSIONS EXCEPTION: ${responseBody.Message}`,
        {
          method: request.method,
          url: request.url,
          statusCode: status,
          message: responseBody.Message,
        },
      );
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      responseBody =
        typeof res === 'string'
          ? {
              Message: 'Error processing your request',
              ResponseCode: status,
            }
          : { ...(res as any), path: request.url };

      this.logger.logError('HttpException', {
        method: request.method,
        url: request.url,
        statusCode: status,
        message: (responseBody as any).message,
      });
    } else {
      this.logger.logError('APPLICATION EXCEPTION', {
        method: request.method,
        url: request.url,
        error: (exception as any).message,
        stack: (exception as any).stack,
      });
    }

    response.status(status).json(responseBody);
  }
}
