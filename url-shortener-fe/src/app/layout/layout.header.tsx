import LinkIcon from '@mui/icons-material/Link';
import { Box, Typography } from '@mui/material';
import { AuthBar } from '../auth/bar/auth.bar';

export function LayoutHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4'>URL Shortener</Typography>
        <LinkIcon sx={{ marginLeft: 2, fontSize: 40 }} />
      </Box>
      <Box>
        <AuthBar />
      </Box>
    </Box>
  );
}
