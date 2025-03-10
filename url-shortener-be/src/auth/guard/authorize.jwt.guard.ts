import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from './strategy/auth.strategy';

/**
 * uses AuthorizeJwtStrategy
 */
export class AuthorizeJwtGuard extends AuthGuard(AuthStrategy.Jwt) {}
