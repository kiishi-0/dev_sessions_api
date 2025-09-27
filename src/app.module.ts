import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { SharedModule } from './shared/shared.module';
import { CodeExecutionModule } from './modules/code-execution/code-execution.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorLoggingMiddleware } from './shared/middlewares/error.logging';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    SharedModule,
    CodeExecutionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: ErrorLoggingMiddleware },
  ],
})
export class AppModule {}
