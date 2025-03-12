import { IsUrl } from 'class-validator';
import { Url } from '../url';

export class UrlCreateDto implements Pick<Url, 'originalUrl'> {
  @IsUrl(undefined, { message: 'Provided URL must be a valid URL address' })
  originalUrl: string;
}
