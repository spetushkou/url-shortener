import { ConfigService } from '@nestjs/config';
import { AppFactory } from './app/bootstrap/app.factory';
import { ServerStarter } from './app/bootstrap/server.starter';
import { useCookie } from './app/bootstrap/use.cookie';
import { useCors } from './app/bootstrap/use.cors';
import { useLogger } from './app/bootstrap/use.logger';
import { useSerializer } from './app/bootstrap/use.serializer';
import { useShutdownHooks } from './app/bootstrap/use.shutdown.hooks';
import { useValidation } from './app/bootstrap/use.validation';

async function bootstrap(): Promise<void> {
  const app = await AppFactory.createExpress();

  const config = app.get(ConfigService);

  useCors(app, config);
  useLogger(app);
  useValidation(app);
  useSerializer(app);
  useCookie(app);
  useShutdownHooks(app);

  await ServerStarter.startHttp(app, config.getOrThrow<number>('APP_PORT'));
}

bootstrap();
