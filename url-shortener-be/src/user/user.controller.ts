import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ResponseControllerInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findMany(): Promise<User[]> {
    return this.service.findMany();
  }

  @Post()
  async create(@Body() createDto: UserCreateDto): Promise<User> {
    const { email } = createDto;
    const entity = await this.service.findOneByEmail(email);
    if (entity) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const entityNew = await this.service.create(createDto);
    return entityNew;
  }
}
