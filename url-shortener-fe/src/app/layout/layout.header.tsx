import LinkIcon from '@mui/icons-material/Link';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthBar } from '../auth/bar/auth.bar';
import { RouterPath } from '../router/router.path';

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
      <Box>
        <Link
          to={RouterPath.Home}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4'>URL Shortener</Typography>
          <LinkIcon sx={{ marginLeft: 2, fontSize: 40 }} />
        </Link>
      </Box>
      <Box>
        <AuthBar />
      </Box>
    </Box>
  );
}
