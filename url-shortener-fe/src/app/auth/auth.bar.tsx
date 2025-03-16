import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RoutePath } from '../router/route.path';
import { AuthContext } from './context/auth.context';

{
  /* {user ? (
          <Typography variant='h6' color='primary'>
            Welcome, {user.email}!
          </Typography>
        ) : null} */
}

export function AuthBar() {
  const location = useLocation();
  const { userEmail, isAuthenticated } = useContext(AuthContext);
  console.log({ userEmail, isAuthenticated });

  const displaySignup = location.pathname !== RoutePath.Signup;

  return (
    <Box>
      {displaySignup && (
        <Link to={RoutePath.Signup} style={{ textDecoration: 'none' }}>
          <Button variant='contained' color='primary'>
            Sign Up
          </Button>
        </Link>
      )}
    </Box>
  );
}
