import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
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

export const AuthService = {
  signup,
};
