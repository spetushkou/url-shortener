import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Typography } from '@mui/material';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UrlSerializeDto } from '../types/url.serialize.dto';

interface Props {
  url: UrlSerializeDto;
}

export function UrlShortenerConfirm({ url }: Props) {
  const onCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(url.slug);
  }, [url.slug]);

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
        <Link to={url.slug} style={{ marginRight: 40 }}>
          {url.slug}
        </Link>
        <Button variant='outlined' color='secondary' startIcon={<ContentCopyIcon />} onClick={onCopyUrl}>
          Copy
        </Button>
      </Box>
    </Box>
  );
}
