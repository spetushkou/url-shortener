import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlCreateDto } from './dto/url.create.dto';
import { Url } from './url';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly service: UrlService) {}

  @Get()
  async findMany(): Promise<{ data: Url[] }> {
    const entities = await this.service.findMany();
    return { data: entities };
  }

  @Post()
  async createShort(@Body() createDto: UrlCreateDto): Promise<{ data: Url }> {
    const entity = await this.service.createShort(createDto);
    return { data: entity };
  }

  @Get(':slug')
  async findOneBySlug(@Param('slug') slug: string): Promise<{ data: Url }> {
    const entity = await this.service.findOneBySlug(slug);
    return { data: entity };
  }
}
