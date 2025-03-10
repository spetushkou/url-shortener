import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

export function useCookie(app: INestApplication, cookieSecret?: string): void {
  app.use(cookieParser(cookieSecret));
}
