import { IsUrl } from 'class-validator';
import { Url } from '../url';

export class UrlCreateDto implements Pick<Url, 'originalUrl'> {
  @IsUrl()
  originalUrl: string;
}
