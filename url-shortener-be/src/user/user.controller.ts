import { Body, ConflictException, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { UserCreateDto } from './dto/user.create.dto';
import { UserSerializer } from './dto/user.serializer.dto';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ResponseControllerInterceptor)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findMany(): Promise<User[]> {
    const entities = await this.service.findMany();
    return entities.map((entity) => new UserSerializer(entity));
  }

  @Post()
  async create(@Body() createDto: UserCreateDto): Promise<User> {
    const { email } = createDto;
    const entity = await this.service.findOneByEmail(email);
    if (entity) {
      throw new ConflictException();
    }

    const entityNew = await this.service.create(createDto);
    return new UserSerializer(entityNew);
  }
}
