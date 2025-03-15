import LinkIcon from '@mui/icons-material/Link';
import { Typography } from '@mui/material';

export function Header() {
  return (
    <Typography sx={{ marginBottom: 6 }} variant='h4' gutterBottom>
      URL Shortener
      <LinkIcon sx={{ marginLeft: 1 }} />
    </Typography>
  );
}
