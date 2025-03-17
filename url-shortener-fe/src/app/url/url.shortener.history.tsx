import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Exception } from '../../common/exception/exception';
import { ExceptionInline } from '../../common/exception/exception.inline';
import { Header } from '../../common/header/header';
import { ProgressOverflow } from '../../common/progress/progress.overflow';
import { ResponseControllerMany } from '../../common/response/response.controller.many';
import { HomeLink } from '../home/home.link';
import { UrlSerializeDto } from './types/url.serialize.dto';
import { UrlToken } from './types/url.token';
import { UrlService } from './url.service';

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
  const urlCollection: UrlSerializeDto[] = urlResponse?.data ?? [];
  const urlCollectionSorted = [...urlCollection].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const onCopyUrl = (shortenUrl: string) => {
    navigator.clipboard.writeText(shortenUrl);
  };

  return (
    <Box>
      {urlLoading && <ProgressOverflow message='Loading...' />}
      <HomeLink />
      <Header header='My history' />
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>Original URL</TableCell>
                <TableCell>Shortened URL</TableCell>
                <TableCell>Visits</TableCell>
                <TableCell>Copy</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urlCollectionSorted.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{row.originalUrl}</TableCell>
                  <TableCell>
                    <Link to={row.shortenUrl} target='_blank'>
                      {row.shortenUrl}
                    </Link>
                  </TableCell>
                  <TableCell>{row.visits}</TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      size='small'
                      color='secondary'
                      startIcon={<ContentCopyIcon />}
                      onClick={() => onCopyUrl(row.shortenUrl)}
                    >
                      Copy
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {urlError && <ExceptionInline error={urlError} />}
    </Box>
  );
}
