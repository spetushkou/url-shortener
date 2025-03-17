import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Exception } from '../../../common/exception/exception';
import { ExceptionInline } from '../../../common/exception/exception.inline';
import { Header } from '../../../common/header/header';
import { ProgressOverflow } from '../../../common/progress/progress.overflow';
import { ResponseControllerMany } from '../../../common/response/response.controller.many';
import { UrlSerializeDto } from '../types/url.serialize.dto';
import { UrlToken } from '../types/url.token';
import { UrlService } from '../url.service';

export function UrlShortenerHistory() {
  const {
    isLoading: urlLoading,
    data: urlResponse,
    error: urlError,
  } = useQuery<ResponseControllerMany<UrlSerializeDto>, Exception>(
    [`${UrlToken.BaseUrl}`, 'findManyByUserId'],
    async () => await UrlService.findManyByUserId(),
    {
      enabled: true,
      retry: false,
    },
  );
  const urlCollection = urlResponse?.data ?? [];
  console.log({ urlCollection });

  return (
    <Box>
      {urlLoading && <ProgressOverflow message='Loading...' />}
      <Header header='Your history' />
      {urlError && <ExceptionInline error={urlError} />}
    </Box>
  );
}
