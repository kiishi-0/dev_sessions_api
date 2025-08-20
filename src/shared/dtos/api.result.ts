import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T> {
  ResponseCode: HttpStatus;
  Message: string;
  Data: T;
}

export interface ErrorModel {
  ResponseCode: HttpStatus;
  Message: string;
}
