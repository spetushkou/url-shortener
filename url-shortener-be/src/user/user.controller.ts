import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ResponseManyController } from '../common/response/response.many.controller';
import { ResponseOneController } from '../common/response/response.one.controller';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findMany(): Promise<ResponseManyController<User>> {
    const entities = await this.service.findMany();
    return { data: entities };
  }

  @Post()
  async create(@Body() createDto: UserCreateDto): Promise<ResponseOneController<User>> {
    const { email } = createDto;
    const entity = await this.service.findOneByEmail(email);
    if (entity) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const entityNew = await this.service.create(createDto);
    return { data: entityNew };
  }
}
