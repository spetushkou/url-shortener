import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Cookie } from '../common/cookie/cookie';
import { UtilMongo } from '../common/util/util.mongo';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { AuthJwtPayload } from './jwt/auth.jwt.payload';
import { AuthJwtService } from './jwt/auth.jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(user: User, res: Response): Promise<void> {
    const expiration = this.configService.getOrThrow<number>('JWT_EXPIRATION');

    const payload: AuthJwtPayload = {
      userId: UtilMongo.getId(user._id),
    };

    const { token, expires } = await AuthJwtService.sign(this.jwtService, expiration, payload);

    res.cookie(Cookie.Authentication, token, { expires, httpOnly: true });
  }

  async login(user: User, res: Response): Promise<void> {
    const expiration = this.configService.getOrThrow<number>('JWT_EXPIRATION');

    const payload: AuthJwtPayload = {
      userId: UtilMongo.getId(user._id),
    };

    const { token, expires } = await AuthJwtService.sign(this.jwtService, expiration, payload);

    res.cookie(Cookie.Authentication, token, { expires, httpOnly: true });
  }
}
