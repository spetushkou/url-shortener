import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button } from '@mui/material';

interface Props {
  shortenUrl: string;
  onCopyUrl: (shortenUrl: string) => void;
}

export function UrlCopyLink({ shortenUrl, onCopyUrl }: Props) {
  return (
    <Button
      variant='outlined'
      size='small'
      color='secondary'
      startIcon={<ContentCopyIcon />}
      onClick={() => onCopyUrl(shortenUrl)}
    >
      Copy
    </Button>
  );
}
