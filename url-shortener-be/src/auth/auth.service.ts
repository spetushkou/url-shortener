import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Cookie } from '../common/cookie/cookie';
import { User } from '../user/user';
import { AuthJwtPayload } from './jwt/auth.jwt.payload';
import { AuthJwtService } from './jwt/auth.jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response): Promise<void> {
    const expiration = this.configService.getOrThrow<number>('JWT_EXPIRATION');

    const payload: AuthJwtPayload = {
      userId: user._id.toHexString(),
    };

    const { token, expires } = await AuthJwtService.sign(this.jwtService, expiration, payload);

    res.cookie(Cookie.Authentication, token, { expires, httpOnly: true });
  }
}
