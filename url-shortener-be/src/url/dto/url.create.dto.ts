import { IsUrl } from 'class-validator';
import { Url } from '../url';

export class UrlCreateDto implements Omit<Url, '_id' | 'createdAt' | 'slug'> {
  @IsUrl()
  originalUrl: string;
}
