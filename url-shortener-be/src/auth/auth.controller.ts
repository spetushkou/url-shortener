import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { Transformer } from '../common/transformer/transformer';
import { UserCreateDto } from '../user/dto/user.create.dto';
import { UserSerializeDto } from '../user/dto/user.serialize.dto';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import { AuthUser } from './decorator/auth.user.decorator';
import { AuthenticateLocalGuard } from './guard/authenticate.local.guard';
import { AuthorizeJwtGuard } from './guard/authorize.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() userCreateDto: UserCreateDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const isUnique = await this.authService.verifyUniqueSignup(userCreateDto);
    if (!isUnique) {
      throw new ConflictException(
        'This email address is already associated with an account. Please try logging in or use a different email address.',
      );
    }

    const user = await this.authService.signup(userCreateDto);

    await this.authService.setResponseAuthenticationCookie(user, res);

    const userSerialized = Transformer.toPlain(new UserSerializeDto(user));

    res.send(userSerialized);
  }

  @Post('signin')
  @UseGuards(AuthenticateLocalGuard)
  @HttpCode(HttpStatus.OK)
  async signin(@AuthUser() user: User, @Res({ passthrough: true }) res: Response): Promise<void> {
    await this.authService.setResponseAuthenticationCookie(user, res);

    const userSerialized = Transformer.toPlain(new UserSerializeDto(user));

    res.send(userSerialized);
  }

  @Post('signout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signout(@Res({ passthrough: true }) res: Response): Promise<void> {
    await this.authService.deleteResponseAuthenticationCookie(res);
  }

  @Get('me')
  @UseInterceptors(ResponseControllerInterceptor)
  @UseGuards(AuthorizeJwtGuard)
  async me(@AuthUser() user: User): Promise<User> {
    return new UserSerializeDto(user);
  }
}
