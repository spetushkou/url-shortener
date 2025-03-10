import { Url } from '../url';

export class UrlCreateRepositoryDto implements Pick<Url, 'originalUrl' | 'slug'> {
  originalUrl: string;
  slug: string;
}
