import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseMongoModule } from '../database/mongo/database.mongo.module';
import { UrlController } from './url.controller';
import { Url, UrlSchema } from './url.entity';
import { UrlRepository } from './url.repository';
import { UrlService } from './url.service';

@Module({
  imports: [ConfigModule, DatabaseMongoModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
  controllers: [UrlController],
  providers: [UrlRepository, UrlService],
})
export class UrlModule {}
