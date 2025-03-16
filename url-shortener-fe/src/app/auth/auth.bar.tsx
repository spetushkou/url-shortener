import { Box, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Exception } from '../../common/exception/exception';
import { RoutePath } from '../router/route.path';
import { AuthService } from './auth.service';
import { AuthContext } from './context/auth.context';

export function AuthBar() {
  const location = useLocation();
  const { userEmail, isAuthenticated } = useContext(AuthContext);

  const displaySignup = location.pathname !== RoutePath.Signup && !isAuthenticated;
  const displaySignin = location.pathname !== RoutePath.Signin && !isAuthenticated;
  const displaySignout = isAuthenticated;
  const displayUserId = isAuthenticated;

  const signoutHandler = useMutation({
    mutationFn: () => {
      return AuthService.signout();
    },
  });
  const signoutError = signoutHandler.error as Exception;

  if (signoutError) {
    console.error(signoutError);
  }

  const onSignout = async (event: React.FormEvent) => {
    event.preventDefault();
    signoutHandler.mutate();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {displayUserId && <Typography sx={{ marginRight: 2 }}>Welcome, {userEmail}</Typography>}
      {displaySignout && (
        <Link to={RoutePath.Signup} style={{ textDecoration: 'none' }} onClick={onSignout}>
          Sign out
        </Link>
      )}
      {displaySignup && (
        <Link to={RoutePath.Signup} style={{ textDecoration: 'none' }}>
          Sign up
        </Link>
      )}
    </Box>
  );
}
