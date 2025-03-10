import { Module } from '@nestjs/common';
import { DatabaseMongoMongooseModule } from '../database/mongo/database.mongo.mongoose.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseMongoMongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
