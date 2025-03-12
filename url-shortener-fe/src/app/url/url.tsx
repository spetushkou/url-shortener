import { Box, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Exception } from '../../common/exception/exception.ts';
import { ResponseControllerMany } from '../../common/response/response.controller.many.ts';
import { UrlCreateDto } from './types/url.create.dto.ts';
import { UrlToken } from './types/url.token.ts';
import { Url as UrlType } from './types/url.ts';
import './url.css';
import { UrlService } from './url.service.ts';
import { UrlShortenerForm } from './url.shortener.form.tsx';
import { UrlShortenerList } from './url.shortener.list.tsx';

export function Url() {
  const queryClient = useQueryClient();

  // url state
  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

  console.log({ url });

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

  // submit handler
  const onCreateShort = () => {
    createShortHandler.mutate(url);
  };

  // component loading and error states
  const loading = urlFindManyLoading || urlSubmitLoading;
  const error = urlFindManyError || urlSubmitError;

  return (
    <Container maxWidth='sm'>
      {loading && <div>Loading...</div>}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant='h4' gutterBottom>
          URL Shortener
        </Typography>
        <UrlShortenerForm url={url} setUrl={setUrl} onCreateShort={onCreateShort} />
        <UrlShortenerList urlCollection={urlCollection} />
      </Box>
      {error && <div className='error'>{error.message}</div>}
    </Container>
  );
}
