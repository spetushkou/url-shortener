import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Exception } from '../../../common/exception/exception';
import { ProgressOverflow } from '../../../common/progress/progress.overflow';
import { ResponseControllerOne } from '../../../common/response/response.controller.one';
import { RouterPath } from '../../router/router.path';
import { UrlSerializeDto } from '../types/url.serialize.dto';
import { UrlToken } from '../types/url.token';
import { UrlService } from '../url.service';

export function UrlRedirect() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: urlLoading,
    data: urlResponse,
    error: urlError,
  } = useQuery<ResponseControllerOne<UrlSerializeDto> | null, Exception>(
    [`${UrlToken.BaseUrl}`, 'findOneBySlug', slug],
    async () => {
      if (!slug) {
        return null;
      }

      return await UrlService.findOneBySlug(slug);
    },
    {
      enabled: !!slug,
      retry: 2,
    },
  );
  const url = urlResponse?.data ?? null;

  if (urlLoading) {
    return <ProgressOverflow message='Loading...' />;
  }

  if (urlError) {
    navigate(RouterPath.NotFound);
  }

  if (url?.originalUrl) {
    window.location.href = url.originalUrl;
  }

  return null;
}
