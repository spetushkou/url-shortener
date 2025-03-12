import { Url } from './url';

export class UrlCreateDto implements Pick<Url, 'originalUrl'> {
  originalUrl: string;
}
