import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticateLocalStrategy } from './guard/strategy/authenticate.local.strategy';
import { AuthorizeJwtStrategy } from './guard/strategy/authorize.jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow<number>('JWT_EXPIRATION')}s`,
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthenticateLocalStrategy, AuthorizeJwtStrategy],
})
export class AuthModule {}
