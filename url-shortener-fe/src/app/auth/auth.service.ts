import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
import { ResponseControllerOne } from '../../common/response/response.controller.one';
import { AuthToken } from './types/auth.token';
import { UserCreateDto } from './user/types/user.create.dto';
import { UserSerializeDto } from './user/types/user.serialize.dto';

const signup = async (createDto: UserCreateDto): Promise<UserSerializeDto> => {
  try {
    const endpoint = `/${AuthToken.BaseUrl}/signup`;

    const response = await HttpClient().post<UserSerializeDto>(endpoint, createDto);
    const { data } = response;

    return data;
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

const me = async (): Promise<ResponseControllerOne<UserSerializeDto>> => {
  try {
    const endpoint = `/${AuthToken.BaseUrl}/me`;

    const response = await HttpClient().get<ResponseControllerOne<UserSerializeDto>>(endpoint);
    const { data } = response;

    return data;
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

export const AuthService = {
  signup,
  me,
};
