import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Cookie } from '../../common/cookie/cookie';
import { AuthJwtPayload } from './auth.jwt.payload';

interface AuthJwt {
  token: string;
  maxAge: number;
}

async function sign(jwtService: JwtService, expirationSeconds: number, payload: AuthJwtPayload): Promise<AuthJwt> {
  const maxAge = expirationSeconds * 1000;
  const token = await jwtService.signAsync(payload);

  return {
    token,
    maxAge,
  };
}

function getAuthorizationCookiesFromRequest(req: Request): any {
  return req.cookies?.[Cookie.Authentication];
}

export const AuthJwtService = {
  sign,
  getAuthorizationCookiesFromRequest,
};
