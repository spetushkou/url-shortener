import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthJwtService } from '../jwt/auth.jwt.service';
import { AuthorizeJwtGuard } from './authorize.jwt.guard';

@Injectable()
export class AuthorizeJwtOptionalGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authCookiesValue = AuthJwtService.getAuthorizationCookiesFromRequest(req);

    // If not authenticated, just allow the request to continue
    if (!authCookiesValue) {
      return true;
    }

    // If JWT exists, use the AuthGuard to validate it
    const authGuard = new AuthorizeJwtGuard();
    return authGuard.canActivate(context);
  }
}
