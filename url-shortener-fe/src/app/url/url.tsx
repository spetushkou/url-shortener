import { Box } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ExceptionInline } from '../../common/exception/exception.inline.tsx';
import { Exception } from '../../common/exception/exception.ts';
import { Header } from '../../common/header/header.tsx';
import { ProgressOverflow } from '../../common/progress/progress.overflow.tsx';
import { UrlCreateDto } from './types/url.create.dto.ts';
import { UrlSerializeDto } from './types/url.serialize.dto.ts';
import { UrlToken } from './types/url.token.ts';
import './url.css';
import { UrlService } from './url.service.ts';
import { UrlShortenerConfirm } from './url.shortener.confirm.tsx';
import { UrlShortenerForm } from './url.shortener.form.tsx';

export function Url() {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<UrlCreateDto>({
    originalUrl: '',
  });

  const [shortenUrl, setShortenUrl] = useState<UrlSerializeDto | null>(null);

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

  return (
    <Box>
      {createShortLoading && <ProgressOverflow message='Loading...' />}
      <Header header='Enter the URL to shorten' />
      <UrlShortenerForm url={url} setUrl={setUrl} onCreateShort={onCreateShortUrl} />
      {shortenUrl && <UrlShortenerConfirm shortenUrl={shortenUrl.shortenUrl} />}
      {createShortError && <ExceptionInline error={createShortError} />}
    </Box>
  );
}
