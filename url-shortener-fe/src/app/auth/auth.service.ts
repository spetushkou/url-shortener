import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
import { ResponseControllerOne } from '../../common/response/response.controller.one';
import { UserCreateDto } from '../user/types/user.create.dto';
import { UserDto } from '../user/types/user.dto';
import { UserSerializeDto } from '../user/types/user.serialize.dto';
import { AuthToken } from './types/auth.token';

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

const signin = async (userDto: UserDto): Promise<UserSerializeDto> => {
  try {
    const endpoint = `/${AuthToken.BaseUrl}/signin`;

    const response = await HttpClient().post<UserSerializeDto>(endpoint, userDto);
    const { data } = response;

    return data;
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

const signout = async (): Promise<void> => {
  try {
    const endpoint = `/${AuthToken.BaseUrl}/signout`;

    const response = await HttpClient().post<void>(endpoint);
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
  signin,
  signout,
  me,
};
