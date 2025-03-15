import { Typography } from '@mui/material';
import { HttpError } from '../../common/httpClient/http.error';

interface Props {
  error: Error | HttpError;
}

export function ErrorInline({ error }: Props) {
  return (
    <Typography color='error' sx={{ marginTop: 2 }}>
      {error.message}
    </Typography>
  );
}
