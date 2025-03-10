import { IsUrl } from 'class-validator';
import { UrlCreateRepoDto } from './url.create.repo.dto';

export class UrlCreateDto implements Omit<UrlCreateRepoDto, 'slug'> {
  @IsUrl()
  originalUrl: string;
}
