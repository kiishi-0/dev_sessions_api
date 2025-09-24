// logging.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
// Remove static import of SeqTransport
let SeqTransport: any;

@Injectable()
export class LoggingService {
  private logger: winston.Logger;
  constructor() {
    (async () => {
      // Dynamically import SeqTransport
      // const seqModule = await import('@datalust/winston-seq');
      // SeqTransport = seqModule.SeqTransport;

      this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
        transports: [
          // log to file
          new winston.transports.File({
            filename: 'logs/app.log',
            level: 'info',
          }),

          // log errors separately
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
          }),

          // log to console (helpful for dev)
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
            ),
          }),

          // log to Seq
          // new SeqTransport({
          //   serverUrl: 'http://localhost:5341', // your seq instance
          //   apiKey: 'your-seq-api-key-if-any',
          //   onError: (e: any) => {
          //     console.error('Seq transport error', e);
          //   },
          // }),
        ],
      });
    })();
  }

  logInformation(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  logWarning(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  logError(message: string, meta?: any) {
    this.logger.error(message, meta);
  }

  logCritical(message: string, meta?: any) {
    // Winston doesn’t have "critical" by default → map to "error"
    this.logger.log('error', `[CRITICAL] ${message}`, meta);
  }
}
