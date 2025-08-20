import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorModel } from '../dtos/api.result';
import { error } from 'console';

export class DevSessionException extends HttpException {
  constructor(message: string, statusCode: HttpStatus.INTERNAL_SERVER_ERROR) {
    const errorResponse: ErrorModel = {
      Message: message,
      ResponseCode: statusCode,
    };
    super(errorResponse, statusCode);
  }
}
