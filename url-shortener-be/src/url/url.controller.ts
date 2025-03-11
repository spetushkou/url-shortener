import { Body, Controller, Get, NotFoundException, Param, Post, UseInterceptors } from '@nestjs/common';
import { ResponseControllerInterceptor } from '../common/response/response.controller.interceptor';
import { UrlCreateDto } from './dto/url.create.dto';
import { Url } from './url';
import { UrlService } from './url.service';

@Controller('url')
@UseInterceptors(ResponseControllerInterceptor)
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @Get()
  async findMany(): Promise<Url[]> {
    return this.service.findMany();
  }

  @Post()
  async createShort(@Body() createDto: UrlCreateDto): Promise<Url> {
    return this.service.createShort(createDto);
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<Url> {
    const entity = await this.service.findOneBySlug(slug);
    if (!entity) {
      throw new NotFoundException('URL not found');
    }

    return entity;
  }
}
