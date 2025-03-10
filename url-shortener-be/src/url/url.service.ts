import { Injectable, NotFoundException } from '@nestjs/common';
import crypto from 'crypto';
import { UrlCreateDto } from './dto/url.create.dto';
import { UrlCreateRepositoryDto } from './dto/url.create.repository.dto';
import { Url } from './url';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly repository: UrlRepository) {}

  async findMany(): Promise<Url[]> {
    return this.repository.findMany();
  }

  async createShort(createDto: UrlCreateDto): Promise<Url> {
    const { originalUrl } = createDto;

    const entity = await this.repository.findOne({ originalUrl });
    if (entity) {
      return entity;
    }

    const createRepositoryDto: UrlCreateRepositoryDto = {
      ...createDto,
      slug: this.generateSlug(),
    };

    return this.repository.create(createRepositoryDto);
  }

  private generateSlug(): string {
    return crypto.randomBytes(3).toString('hex');
  }

  async findOneBySlug(slug: string): Promise<Url> {
    const entity = await this.repository.findOne({ slug });
    if (!entity) {
      throw new NotFoundException('URL not found');
    }

    return entity;
  }
}
