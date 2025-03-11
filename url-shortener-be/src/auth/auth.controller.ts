import { Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { Transformer } from '../common/transformer/transformer';
import { UserSerializer } from '../user/dto/user.serializer.dto';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth.user.decorator';
import { AuthenticateLocalGuard } from './guard/authenticate.local.guard';
import { AuthorizeJwtGuard } from './guard/authorize.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthenticateLocalGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    await this.authService.login(user, res);

    const userSerialized = Transformer.toPlain(new UserSerializer(user));

    res.send(userSerialized);
  }

  @Get('me')
  @UseInterceptors(ResponseControllerInterceptor)
  @UseGuards(AuthorizeJwtGuard)
  async me(@AuthUser() user: User): Promise<User> {
    return new UserSerializer(user);
  }
}
