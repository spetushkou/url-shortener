import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  shortenUrl: string;
}

export function UrlShortenerConfirm({ shortenUrl }: Props) {
  const onCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(shortenUrl);
  }, [shortenUrl]);

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
        <Link to={shortenUrl} style={{ marginRight: 40 }}>
          {shortenUrl}
        </Link>
        <Button variant='outlined' color='secondary' startIcon={<ContentCopyIcon />} onClick={onCopyUrl}>
          Copy
        </Button>
      </Box>
    </Box>
  );
}
