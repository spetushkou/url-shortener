import { Url } from '../url';

export class UrlCreateRepositoryDto implements Omit<Url, 'createdAt' | '_id'> {
  originalUrl: string;
  slug: string;
  shortenUrl: string;
  userId: string | null;
}
