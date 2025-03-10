import { Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Transformer } from '../common/transformer/transformer';
import { UserSerializer } from '../user/dto/user.serialize.dto';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth.user.decorator';
import { AuthenticateLocalGuard } from './guard/authenticate.local.guard';
import { AuthorizeJwtGuard } from './guard/authorize.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthenticateLocalGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    await this.authService.login(user, res);

    const userSerialized = Transformer.toPlain(new UserSerializer(user));

    res.send(userSerialized);
  }

  @UseGuards(AuthorizeJwtGuard)
  @Get('me')
  async me(@AuthUser() user: User): Promise<User> {
    return new UserSerializer(user);
  }
}
