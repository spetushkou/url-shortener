import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import mongoose from 'mongoose';
import { AuthModule } from '../auth/auth.module';
import { ExceptionGlobalFilterProvider } from '../common/exception/exception.global.filter.provider';
import { PinoLoggerModule } from '../common/logger/pino/pino.logger.module';
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
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short', // 3 calls in a second
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'medium', // 20 calls in 10 seconds
          ttl: 10000,
          limit: 20,
        },
        {
          name: 'long', // 100 calls in a minute
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    PinoLoggerModule,
    DatabaseMongoModule,
    UserModule,
    AuthModule,
    UrlModule,
  ],
  providers: [ExceptionGlobalFilterProvider],
})
export class AppModule implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await mongoose.disconnect();
  }
}
