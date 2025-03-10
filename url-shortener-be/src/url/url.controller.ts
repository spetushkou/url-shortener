import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ResponseControllerMany } from '../common/response/response.controller.many';
import { ResponseControllerOne } from '../common/response/response.controller.one';
import { UrlCreateDto } from './dto/url.create.dto';
import { Url } from './url';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @Get()
  async findMany(): Promise<ResponseControllerMany<Url>> {
    const entities = await this.service.findMany();
    return { data: entities };
  }

  @Post()
  async createShort(@Body() createDto: UrlCreateDto): Promise<ResponseControllerOne<Url>> {
    const entity = await this.service.createShort(createDto);
    return { data: entity };
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<ResponseControllerOne<Url>> {
    const entity = await this.service.findOneBySlug(slug);
    if (!entity) {
      throw new NotFoundException('URL not found');
    }

    return { data: entity };
  }
}
