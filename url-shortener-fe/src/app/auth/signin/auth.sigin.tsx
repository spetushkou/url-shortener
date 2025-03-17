import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Exception } from '../../../common/exception/exception.base';
import { ExceptionInline } from '../../../common/exception/exception.inline';
import { Header } from '../../../common/header/header';
import { HomeLink } from '../../home/home.link';
import { RouterPath } from '../../router/router.path';
import { UserDto } from '../../user/types/user.dto';
import { AuthService } from '../auth.service';
import { AuthContext } from '../context/auth.context';

export const AuthSignin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserEmail, setIsAuthenticated } = useContext(AuthContext);

  const signinHandler = useMutation({
    mutationFn: (useDto: UserDto) => {
      return AuthService.signin(useDto);
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
  const signinError = signinHandler.error as Exception;
  const signinLoading = signinHandler.isLoading;

  const onSignin = async (event: React.FormEvent) => {
    event.preventDefault();

    signinHandler.mutate({
      email,
      password,
    });
  };

  return (
    <Box>
      <HomeLink />
      <Header header='Signin' />
      <form onSubmit={onSignin}>
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
          <Button type='submit' variant='contained' color='primary' disabled={signinLoading}>
            {signinLoading ? <CircularProgress size={24} color='secondary' /> : 'Sign In'}
          </Button>
        </Box>
      </form>
      {signinError && <ExceptionInline error={signinError} />}
    </Box>
  );
};
