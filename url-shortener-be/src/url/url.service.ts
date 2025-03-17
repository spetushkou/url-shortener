import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto';
import { UtilMongo } from '../common/util/util.mongo';
import { User } from '../user/user';
import { UrlCreateDto } from './dto/url.create.dto';
import { UrlCreateRepositoryDto } from './dto/url.create.repository.dto';
import { Url } from './url';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {
  constructor(
    private readonly configService: ConfigService,
    private readonly repository: UrlRepository,
  ) {}

  async findMany(): Promise<Url[]> {
    return this.repository.findMany();
  }

  async createShort(user: User | null, createDto: UrlCreateDto): Promise<Url> {
    const { originalUrl } = createDto;

    const entity = await this.repository.findOne({ originalUrl });
    if (entity) {
      return entity;
    }

    const shortenBaseUrl = this.getShortenBaseUrl();
    const slug = this.generateSlug(originalUrl);
    const shortenUrl = `${shortenBaseUrl}${slug}`;
    const userId = user ? UtilMongo.parseId(user._id) : null;

    const createRepositoryDto: UrlCreateRepositoryDto = {
      ...createDto,
      slug,
      shortenUrl,
      userId,
    };

    return this.repository.create(createRepositoryDto);
  }

  private generateSlug(originalUrl: string): string {
    const hash = crypto.createHash('sha256').update(originalUrl).digest('hex');
    const slug = hash.slice(0, 6);
    return slug;
  }

  private getShortenBaseUrl(): string {
    return this.configService.getOrThrow<string>('SHORTEN_BASE_URL');
  }

  async findOneBySlug(slug: string): Promise<Url | null> {
    return this.repository.findOne({ slug });
  }
  async findManyByUserId(userId: string): Promise<Url[]> {
    return this.repository.findMany({ userId });
  }
}
