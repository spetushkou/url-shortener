import { Box, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ExceptionInline } from '../../common/exception/exception.inline.tsx';
import { Exception } from '../../common/exception/exception.ts';
import { ResponseControllerMany } from '../../common/response/response.controller.many.ts';
import { UrlCreateDto } from './types/url.create.dto.ts';
import { UrlToken } from './types/url.token.ts';
import { Url as UrlType } from './types/url.ts';
import './url.css';
import { UrlService } from './url.service.ts';
import { UrlShortener } from './url.shortener.tsx';

export function Url() {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

  const {
    isLoading: urlLoading,
    data: urlResponse,
    error: urlError,
  } = useQuery<ResponseControllerMany<UrlType>, Exception>(
    [`${UrlToken.BaseUrl}`, 'findMany'],
    async () => await UrlService.findMany(),
    {
      enabled: true,
    },
  );
  const urlCollection = urlResponse?.data ?? [];

  const createShortHandler = useMutation({
    mutationFn: (createDto: UrlCreateDto) => {
      return UrlService.createShort(createDto);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${UrlToken.BaseUrl}`, 'findMany'] });
    },
  });
  const createShortError = createShortHandler.error as Exception;
  const createShortLoading = createShortHandler.isLoading;

  const onCreateShortUrl = () => {
    createShortHandler.mutate(url);
  };

  const loading = urlLoading || createShortLoading;
  const error = urlError || createShortError;

  return (
    <Box>
      {loading && <Box>Loading...</Box>}
      <Typography variant='h5' gutterBottom>
        Enter the URL to shorten
      </Typography>
      <UrlShortener url={url} setUrl={setUrl} onCreateShort={onCreateShortUrl} />
      {error && <ExceptionInline error={error} />}
    </Box>
  );
}
