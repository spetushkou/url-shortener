import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { UserCreateDto } from './dto/user.create.dto';
import { UserSerializer } from './dto/user.serializer.dto';
import { UserUpdateDto } from './dto/user.update.dto';
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return new UserSerializer(entity);
  }

  @Post()
  async create(@Body() createDto: UserCreateDto): Promise<User> {
    const { email } = createDto;
    const entity = await this.service.findOneByEmail(email);
    if (entity) {
      throw new ConflictException();
    }

    const entityCreated = await this.service.create(createDto);
    return new UserSerializer(entityCreated);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UserUpdateDto): Promise<User> {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    const entityUpdated = await this.service.update(id, updateDto);
    if (!entityUpdated) {
      throw new NotFoundException();
    }

    return new UserSerializer(entityUpdated);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    const entity = await this.service.findOne(id);
    if (!entity) {
      throw new NotFoundException();
    }

    const entityDeleted = await this.service.delete(id);
    if (!entityDeleted) {
      throw new NotFoundException();
    }

    return new UserSerializer(entityDeleted);
  }
}
