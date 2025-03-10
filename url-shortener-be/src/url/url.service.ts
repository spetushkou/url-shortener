import { Injectable, NotFoundException } from '@nestjs/common';
import crypto from 'crypto';
import { UrlCreateDto } from './dto/url.create.dto';
import { UrlCreateRepoDto } from './dto/url.create.repo.dto';
import { Url } from './url';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(private readonly repository: UrlRepository) {}

  async findMany(): Promise<Url[]> {
    return this.repository.findMany();
  }

  async createShort(createDto: UrlCreateDto): Promise<Url> {
    const slug = crypto.randomBytes(3).toString('hex');

    const createRepoDto: UrlCreateRepoDto = {
      ...createDto,
      slug,
    };

    return this.repository.create(createRepoDto);
  }

  async findOneBySlug(slug: string): Promise<string> {
    const url = await this.repository.findOneBySlug(slug);
    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return url.originalUrl;
  }
}
