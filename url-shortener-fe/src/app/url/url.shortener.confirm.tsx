import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UrlCopyLink } from './url.copy.link';

interface Props {
  shortenUrl: string;
}

export function UrlShortenerConfirm({ shortenUrl }: Props) {
  const onCopyUrl = useCallback((shortenUrl: string) => {
    navigator.clipboard.writeText(shortenUrl);
  }, []);

  return (
    <Box>
      <Typography color='success.main' sx={{ marginTop: 3, marginBottom: 1 }}>
        {"Success! Here's your short URL:"}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Link to={shortenUrl} target='_blank' style={{ marginRight: 40 }}>
          {shortenUrl}
        </Link>
        <UrlCopyLink shortenUrl={shortenUrl} onCopyUrl={onCopyUrl} />
      </Box>
    </Box>
  );
}
