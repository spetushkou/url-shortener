import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { RouterPath } from '../../app/router/router.path';

export function ReturnHomeLink() {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Link to={RouterPath.Home} style={{ textDecoration: 'none' }}>
        Return Home
      </Link>
    </Box>
  );
}
