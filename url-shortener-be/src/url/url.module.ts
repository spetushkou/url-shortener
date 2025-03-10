import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoMongooseModule } from '../database/mongo/database.mongo.mongoose.module';
import { UrlController } from './url.controller';
import { Url, UrlSchema } from './url.entity';
import { UrlRepository } from './url.repository';
import { UrlService } from './url.service';

@Module({
  imports: [ConfigModule, DatabaseMongoMongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [UrlRepository, UrlService],
})
export class UrlModule {}
