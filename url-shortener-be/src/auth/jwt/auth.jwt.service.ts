import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './auth.jwt.payload';

interface AuthJwtResponse {
  token: string;
  expires: Date;
}

async function sign(jwtService: JwtService, expiration: number, payload: AuthJwtPayload): Promise<AuthJwtResponse> {
  const expires = new Date();
  expires.setSeconds(expires.getSeconds() + expiration);

  const token = await jwtService.signAsync(payload);

  return {
    token,
    expires,
  };
}

export const AuthJwtService = {
  sign,
};
