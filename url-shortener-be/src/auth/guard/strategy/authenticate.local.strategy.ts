import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../auth.service';
import { AuthResponse } from '../../reponse/auth.response';
import { AuthStrategy } from './auth.strategy';

@Injectable()
export class AuthenticateLocalStrategy extends PassportStrategy(Strategy, AuthStrategy.Local) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * CAUTION: `validate` is a predefined function name, cannot has other name than that.
   * @param email Defined by the 'usernameField' constructor param.
   * @param password Defined by the 'passwordField' constructor param.
   * @returns A User object that will be injected to the express Request object as `request.user` property
   *
   */
  async validate(email: string, password: string): Promise<AuthResponse> {
    const user = await this.authService.verifySignin(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
