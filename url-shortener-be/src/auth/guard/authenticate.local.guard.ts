import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from './strategy/auth.strategy';

/**
 * uses AuthenticateLocalStrategy
 */
export class AuthenticateLocalGuard extends AuthGuard(AuthStrategy.Local) {}
