import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthUser } from '../auth/decorator/auth.user.decorator';
import { AuthorizeJwtGuard } from '../auth/guard/authorize.jwt.guard';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { User } from '../user/user';
import { UrlCreateDto } from './dto/url.create.dto';
import { UrlSerializeDto } from './dto/url.serialize.dto';
import { Url } from './url';
import { UrlService } from './url.service';

@Controller('url')
@UseInterceptors(ResponseControllerInterceptor)
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @Get()
  async findMany(): Promise<Url[]> {
    const entities = await this.service.findMany();
    return entities.map((entity) => new UrlSerializeDto(entity));
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Url> {
    const entity = await this.service.findOneBySlug(slug);
    if (!entity) {
      throw new NotFoundException('URL not found');
    }

    return new UrlSerializeDto(entity);
  }

  @Post()
  @UseGuards(AuthorizeJwtGuard)
  async createShort(@AuthUser() user: User, @Body() createDto: UrlCreateDto): Promise<Url> {
    console.log({ user });
    const entity = await this.service.createShort(createDto);
    return new UrlSerializeDto(entity);
  }
}
