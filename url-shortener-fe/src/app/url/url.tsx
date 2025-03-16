import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ExceptionInline } from '../../common/exception/exception.inline.tsx';
import { Exception } from '../../common/exception/exception.ts';
import { Header } from '../../common/header/header.tsx';
import { ProgressOverflow } from '../../common/progress/progress.overflow.tsx';
import { ResponseControllerMany } from '../../common/response/response.controller.many.ts';
import { UrlShortenerConfirm } from './shortenerConfirm/url.shortener.confirm.tsx';
import { UrlShortenerForm } from './shortenerForm/url.shortener.form.tsx';
import { UrlCreateDto } from './types/url.create.dto.ts';
import { UrlSerializeDto } from './types/url.serialize.dto.ts';
import { UrlToken } from './types/url.token.ts';
import './url.css';
import { UrlService } from './url.service.ts';

export function Url() {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

  const [shortenUrl, setShortenUrl] = useState<UrlSerializeDto | null>(null);

  const {
    isLoading: urlLoading,
    data: urlResponse,
    error: urlError,
  } = useQuery<ResponseControllerMany<UrlSerializeDto>, Exception>(
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
    onSettled: (data) => {
      if (!data) {
        return;
      }

      setShortenUrl(data.data ?? null);

      queryClient.invalidateQueries({ queryKey: [`${UrlToken.BaseUrl}`, 'findMany'] });
    },
  });
  const createShortError = createShortHandler.error as Exception;
  const createShortLoading = createShortHandler.isLoading;

  const onCreateShortUrl = () => {
    setShortenUrl(null);
    createShortHandler.mutate(url);
  };

  const loading = urlLoading || createShortLoading;
  const error = urlError || createShortError;

  return (
    <Box>
      {loading && <ProgressOverflow message='Loading...' />}
      <Header header='Enter the URL to shorten' />
      <UrlShortenerForm url={url} setUrl={setUrl} onCreateShort={onCreateShortUrl} />
      {shortenUrl && <UrlShortenerConfirm shortenUrl={shortenUrl.shortenUrl} />}
      {error && <ExceptionInline error={error} />}
    </Box>
  );
}
