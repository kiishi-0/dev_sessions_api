import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorModel } from '../dtos/api.result';
import { error } from 'console';

export class DevSessionException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    const errorResponse: ErrorModel = {
      Message: message,
      ResponseCode: statusCode,
    };
    super(errorResponse, statusCode);
  }
}
