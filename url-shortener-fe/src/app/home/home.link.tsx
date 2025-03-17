import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouterPath } from '../router/router.path';

export function HomeLink() {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Link to={RouterPath.Home} style={{ textDecoration: 'none' }}>
        Return Home
      </Link>
    </Box>
  );
}
