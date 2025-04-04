import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../user/user.service';
import { AuthJwtPayload } from '../../jwt/auth.jwt.payload';
import { AuthJwtService } from '../../jwt/auth.jwt.service';
import { AuthResponse } from '../../reponse/auth.response';
import { AuthStrategy } from './auth.strategy';

@Injectable()
export class AuthorizeJwtStrategy extends PassportStrategy(Strategy, AuthStrategy.Jwt) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): any => {
          return AuthJwtService.getAuthorizationCookiesFromRequest(req);
        },
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  /**
   * CAUTION: `validate` is a predefined function name, cannot has other name than that.
   * @param payload AuthJwtPayload object injected by the 'jwtFromRequest' constructor param.
   * @returns A User object that will be injected to the incomming Request object as `user` property
   *
   */
  async validate({ userId }: AuthJwtPayload): Promise<AuthResponse> {
    return this.userService.findOne(userId);
  }
}
