import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Exception } from '../../common/exception/exception.ts';
import { ResponseControllerMany } from '../../common/response/response.controller.many.ts';
import { UrlCreateDto } from './types/url.create.dto.ts';
import { UrlToken } from './types/url.token.ts';
import { Url as UrlType } from './types/url.ts';
import './url.css';
import { UrlService } from './url.service.ts';

export function Url() {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

  // findMany handler
  const {
    isLoading: urlFindManyLoading,
    data: urlFindManyResponse,
    error: urlFindManyError,
  } = useQuery<ResponseControllerMany<UrlType>, Exception>(
    [`${UrlToken.BaseUrl}`, 'findMany'],
    async () => await UrlService.findMany(),
    {
      enabled: true,
    },
  );
  const urlCollection = urlFindManyResponse?.data ?? [];

  // createShort handler
  const createShortHandler = useMutation({
    mutationFn: (createDto: UrlCreateDto) => {
      return UrlService.createShort(createDto);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${UrlToken.BaseUrl}`, 'findMany'] });
    },
  });
  const urlSubmitError = createShortHandler.error as Exception;
  const urlSubmitLoading = createShortHandler.isLoading;

  // form field input handler that updates the component state
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrl((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // submit handler
  const onCreateShort = () => {
    createShortHandler.mutate(url);
  };

  // component loading and error states
  const loading = urlFindManyLoading || urlSubmitLoading;
  const error = urlFindManyError || urlSubmitError;

  return (
    <>
      {loading && <div>Loading...</div>}

      <h1>Add new URL</h1>

      <div>
        <div>
          <label htmlFor='originalUrl'>Url: </label>
          <input id='originalUrl' name='originalUrl' type='text' value={url.originalUrl} onChange={onInputChange} />
        </div>
        <div className='card'>
          <button onClick={onCreateShort}>Submit a new URL!</button>
          {error && <div className='error'>{error.message}</div>}
        </div>
      </div>
      <h1>{"URL's"}</h1>
      <div>
        {urlCollection.map((url) => {
          return <div key={url._id}>{`${url.originalUrl} with slug ${url.slug}`}</div>;
        })}
      </div>
    </>
  );
}
