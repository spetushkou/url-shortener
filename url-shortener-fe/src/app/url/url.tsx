import { Box, Container } from '@mui/material';
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
import { UrlShortenerForm } from './url.shortener.form.tsx';

export function Url() {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

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

  const createShortUrlHandler = useMutation({
    mutationFn: (createDto: UrlCreateDto) => {
      return UrlService.createShort(createDto);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`${UrlToken.BaseUrl}`, 'findMany'] });
    },
  });
  const urlSubmitError = createShortUrlHandler.error as Exception;
  const urlSubmitLoading = createShortUrlHandler.isLoading;

  const onCreateShortUrl = () => {
    createShortUrlHandler.mutate(url);
  };

  const loading = urlFindManyLoading || urlSubmitLoading;
  const error = urlFindManyError || urlSubmitError;

  return (
    <Container>
      {loading && <Box>Loading...</Box>}

      <Box>
        <UrlShortenerForm url={url} setUrl={setUrl} onCreateShort={onCreateShortUrl} />
        {/* <UrlShortenerList urlCollection={urlCollection} /> */}
      </Box>
      {error && <ExceptionInline error={error} />}
    </Container>
  );
}
