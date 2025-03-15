import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
import { ResponseControllerMany } from '../../common/response/response.controller.many';
import { ResponseControllerOne } from '../../common/response/response.controller.one';
import { UrlCreateDto } from './types/url.create.dto';
import { UrlSerializeDto } from './types/url.serialize.dto';
import { UrlToken } from './types/url.token';

const findMany = async (): Promise<ResponseControllerMany<UrlSerializeDto>> => {
  try {
    const endpoint = `/${UrlToken.BaseUrl}`;

    const response = await HttpClient().get<ResponseControllerMany<UrlSerializeDto>>(endpoint);
    const { data } = response;

    return { data: data.data };
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

const createShort = async (createDto: UrlCreateDto): Promise<ResponseControllerOne<UrlSerializeDto>> => {
  try {
    const endpoint = `/${UrlToken.BaseUrl}`;

    const response = await HttpClient().post<ResponseControllerOne<UrlSerializeDto>>(endpoint, createDto);
    const { data } = response;

    return { data: data.data };
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

export const UrlService = {
  findMany,
  createShort,
};
