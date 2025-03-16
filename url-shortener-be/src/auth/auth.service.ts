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

  async verifyUniqueSignup(userCreateDto: UserCreateDto): Promise<boolean> {
    return this.userService.validateUnique(userCreateDto.email);
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
    const expirationSeconds = this.configService.getOrThrow<number>('JWT_EXPIRATION');

    const authJwtPayload: AuthJwtPayload = {
      userId: UtilMongo.parseId(user._id),
    };

    const { token, maxAge } = await AuthJwtService.sign(this.jwtService, expirationSeconds, authJwtPayload);

    res.cookie(Cookie.Authentication, token, {
      httpOnly: false, // for the case to obtain auth related data on FE (i.e. user name, user roles, etc.)
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge,
    });
  }

  async deleteResponseAuthenticationCookie(res: Response): Promise<void> {
    res.clearCookie(Cookie.Authentication);
  }
}
