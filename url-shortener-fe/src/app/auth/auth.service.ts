import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
import { ResponseControllerOne } from '../../common/response/response.controller.one';
import { Url } from './types/url';
import { UrlCreateDto } from './types/url.create.dto';
import { UrlToken } from './types/url.token';

const signup = async (createDto: UrlCreateDto): Promise<ResponseControllerOne<Url>> => {
  try {
    const endpoint = `/${UrlToken.BaseUrl}`;

    const response = await HttpClient().post<ResponseControllerOne<Url>>(endpoint, createDto);
    const { data } = response;

    return { data: data.data };
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

export const AuthService = {
  signup,
};
