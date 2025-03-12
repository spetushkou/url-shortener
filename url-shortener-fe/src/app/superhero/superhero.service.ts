import { ExceptionParser } from '../../common/exception/exception.parser';
import { HttpClient } from '../../common/httpClient/http.client';
import { ResponseFindMany } from '../../common/response/response.find.many';
import { Superhero } from './types/superhero';
import { SuperheroCreateDto } from './types/superhero.create.dto';
import { SuperheroToken } from './types/superhero.token';

const create = async (createDto: SuperheroCreateDto): Promise<Superhero> => {
  try {
    const endpoint = `/${SuperheroToken.BaseUrl}`;

    const response = await HttpClient().post<Superhero>(endpoint, createDto);
    const { data } = response;

    return data;
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

const findMany = async (): Promise<ResponseFindMany<Superhero>> => {
  try {
    const endpoint = `/${SuperheroToken.BaseUrl}`;

    const response = await HttpClient().get<ResponseFindMany<Superhero>>(endpoint);
    const { data } = response;

    return { data: data.data };
  } catch (error) {
    return Promise.reject(ExceptionParser.parse(error));
  }
};

export const SuperheroService = {
  create,
  findMany,
};
