import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * see: `AuthenticateLocalStrategy.validate()`
 * A User object has been injected to the express Request object as `request.user` property after passing the `@UseGuards(AuthenticateLocalGuard)` guard
 * or
 * see: `AuthorizeJwtStrategy.validate()`
 * A User object has been injected to the express Request object as `request.user` property after passing the `@UseGuards(AuthorizeJwtGuard)` guard
 */
export const AuthUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
});
