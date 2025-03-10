import { Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { ExceptionGlobalFilterProvider } from '../common/exception/exception.global.filter.provider';
import { PinoLoggerModule } from '../common/logger/pino/pino.logger.module';
import { DatabaseMongoMongooseModule } from '../database/mongo/database.mongo.mongoose.module';
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
    PinoLoggerModule,
    DatabaseMongoMongooseModule,
    UrlModule,
    UserModule,
  ],
  providers: [ExceptionGlobalFilterProvider],
})
export class AppModule implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await mongoose.disconnect();
  }
}
