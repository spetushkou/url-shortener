import { Url } from '../url';

export class UrlCreateRepositoryDto implements Omit<Url, '_id' | 'createdAt'> {
  originalUrl: string;
  slug: string;
}
