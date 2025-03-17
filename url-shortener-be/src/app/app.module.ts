import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import mongoose from 'mongoose';
import { AuthModule } from '../auth/auth.module';
import { ExceptionGlobalFilterProvider } from '../common/exception/exception.global.filter.provider';
import { PinoLoggerModule } from '../common/logger/pino/pino.logger.module';
import { ThrottleGlobalProvider } from '../common/throttle/throttle.global.provider';
import { DatabaseMongoModule } from '../database/mongo/database.mongo.module';
import { UrlModule } from '../url/url.module';
import { UserModule } from '../user/user.module';
import { AppConfigValidationSchema } from './app.config.validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: AppConfigValidationSchema(),
      validationOptions: {
        abortEarly: true,
      },
      cache: true,
      expandVariables: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short', // 3 calls in 1 second
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long', // 1000 calls in 1 minute
        ttl: 60000,
        limit: 1000,
      },
    ]),
    PinoLoggerModule,
    DatabaseMongoModule,
    UserModule,
    AuthModule,
    UrlModule,
  ],
  providers: [ExceptionGlobalFilterProvider, ThrottleGlobalProvider],
})
export class AppModule implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await mongoose.disconnect();
  }
}
