import { Url } from '../url';

export type UrlCreateRepoDto = Omit<Url, '_id' | 'createdAt'>;
