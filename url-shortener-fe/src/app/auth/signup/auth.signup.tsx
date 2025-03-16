import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Exception } from '../../../common/exception/exception';
import { ExceptionInline } from '../../../common/exception/exception.inline';
import { Header } from '../../../common/header/header';
import { RouterPath } from '../../router/router.path';
import { UserCreateDto } from '../../user/types/user.create.dto';
import { AuthService } from '../auth.service';
import { AuthContext } from '../context/auth.context';

export const AuthSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserEmail, setIsAuthenticated } = useContext(AuthContext);

  const signupHandler = useMutation({
    mutationFn: (createDto: UserCreateDto) => {
      return AuthService.signup(createDto);
    },
    onSettled: (data) => {
      if (!data) {
        return;
      }

      setUserEmail(data.email);
      setIsAuthenticated(true);
      navigate(RouterPath.Home);
    },
  });
  const signupError = signupHandler.error as Exception;
  const signupLoading = signupHandler.isLoading;

  const onSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    signupHandler.mutate({
      email,
      password,
    });
  };

  return (
    <Box>
      <Header header='Signup' />
      <form onSubmit={onSignup}>
        <TextField
          id='email'
          name='email'
          label='Email'
          helperText='Try: name1@company.com'
          variant='outlined'
          fullWidth
          required
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id='password'
          name='password'
          label='Password'
          helperText='Try: raNdomPass1357!'
          variant='outlined'
          fullWidth
          required
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box>
          <Button type='submit' variant='contained' color='primary' disabled={signupLoading}>
            {signupLoading ? <CircularProgress size={24} color='secondary' /> : 'Sign Up'}
          </Button>
          <Link to={RouterPath.Home} style={{ textDecoration: 'none', marginLeft: 10 }}>
            Return Back
          </Link>
        </Box>
      </form>
      {signupError && <ExceptionInline error={signupError} />}
    </Box>
  );
};
