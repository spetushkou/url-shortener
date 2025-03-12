import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Cookie } from '../common/cookie/cookie';
import { UtilMongo } from '../common/util/util.mongo';
import { UserCreateDto } from '../user/dto/user.create.dto';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { AuthJwtPayload } from './jwt/auth.jwt.payload';
import { AuthJwtService } from './jwt/auth.jwt.service';
import { AuthPasswordService } from './password/auth.password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async verifySignup(userCreateDto: UserCreateDto): Promise<boolean> {
    const isUnique = await this.userService.validateUnique(userCreateDto.email);
    return isUnique;
  }

  async signup(userCreateDto: UserCreateDto): Promise<User> {
    return this.userService.create(userCreateDto);
  }

  async verifySignin(emailToVerify: string, passwordToVerify: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(emailToVerify);
    if (!user) {
      return null;
    }

    const passwordValid = await AuthPasswordService.verify(passwordToVerify, user.password);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  async setResponseAuthenticationCookie(user: User, res: Response): Promise<void> {
    const expiration = this.configService.getOrThrow<number>('JWT_EXPIRATION');

    const authJwtPayload: AuthJwtPayload = {
      userId: UtilMongo.parseId(user._id),
    };

    const { token, expires } = await AuthJwtService.sign(this.jwtService, expiration, authJwtPayload);

    res.cookie(Cookie.Authentication, token, { expires, httpOnly: true });
  }

  deleteResponseAuthenticationCookie(res: Response): void {
    res.clearCookie(Cookie.Authentication);
  }
}
