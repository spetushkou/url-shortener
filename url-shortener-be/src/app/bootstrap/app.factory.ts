import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../app.module';

async function createExpress(): Promise<NestExpressApplication> {
  return await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
    bufferLogs: true,
    forceCloseConnections: true,
  });
}

export const AppFactory = {
  createExpress,
};
