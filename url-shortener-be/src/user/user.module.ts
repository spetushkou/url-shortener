import { Module } from '@nestjs/common';
import { DatabaseMongoModule } from '../database/mongo/database.mongo.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseMongoModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
