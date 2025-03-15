import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RoutePath } from '../router/route.path';

export function AuthBar() {
  return (
    <Box>
      <Link to={RoutePath.Signup} style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='primary'>
          Sign Up
        </Button>
      </Link>
    </Box>
  );
}
