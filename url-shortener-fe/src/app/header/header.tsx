import LinkIcon from '@mui/icons-material/Link';
import { Box, Typography } from '@mui/material';

export function Header() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
      <Typography variant='h4'>URL Shortener</Typography>
      <LinkIcon sx={{ marginLeft: 2, fontSize: 40 }} />
    </Box>
  );
}
