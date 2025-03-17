import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function useCors(app: INestApplication, config: ConfigService): void {
  app.enableCors({
    origin: [config.getOrThrow<string>('CLIENT_URL')],
    methods: 'GET,HEAD,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Type,Authorization',
    credentials: true,
    maxAge: 3600,
  });
}
