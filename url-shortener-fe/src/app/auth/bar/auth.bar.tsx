import { Box, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Exception } from '../../../common/exception/exception.base';
import { RouterPath } from '../../router/router.path';
import { AuthService } from '../auth.service';
import { AuthContext } from '../context/auth.context';

export function AuthBar() {
  const location = useLocation();
  const { userEmail, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const displaySignup = location.pathname !== RouterPath.Signup && !isAuthenticated;
  const displaySignin = location.pathname !== RouterPath.Signin && !isAuthenticated;
  const displaySignout = isAuthenticated;
  const displayUserId = isAuthenticated;
  const displayHistory = isAuthenticated;

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
    navigate(RouterPath.Home);
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
      {displayHistory && (
        <Link to={RouterPath.History} style={{ textDecoration: 'none', marginRight: 10 }}>
          My History
        </Link>
      )}
      {displaySignout && (
        <Link to={RouterPath.Signup} style={{ textDecoration: 'none', marginRight: 10 }} onClick={onSignout}>
          Sign out
        </Link>
      )}
      {displaySignup && (
        <Link to={RouterPath.Signup} style={{ textDecoration: 'none', marginRight: 10 }}>
          Sign up
        </Link>
      )}
      {displaySignin && (
        <Link to={RouterPath.Signin} style={{ textDecoration: 'none', marginRight: 10 }}>
          Sign in
        </Link>
      )}
    </Box>
  );
}
