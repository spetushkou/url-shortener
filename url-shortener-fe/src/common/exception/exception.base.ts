import { HttpError } from '../httpClient/http.error';

export type Exception = Error | HttpError | null;
