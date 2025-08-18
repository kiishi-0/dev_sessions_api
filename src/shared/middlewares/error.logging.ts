// error-logging.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../logger/log.util';

@Injectable()
export class ErrorLoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Hook into response "finish" event to check for errors
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this.logger.logError('HTTP Error Response', {
          method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          ip: req.ip,
        });
      }
    });

    // Handle thrown errors
    res.on('error', (err) => {
      this.logger.logCritical('Unhandled Response Error', {
        method: req.method,
        url: req.originalUrl,
        error: err.message,
        stack: err.stack,
      });
    });

    next();
  }
}
