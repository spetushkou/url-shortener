import { JwtService } from '@nestjs/jwt';
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

export const AuthJwtService = {
  sign,
};
