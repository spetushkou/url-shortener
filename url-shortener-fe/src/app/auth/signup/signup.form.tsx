import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Exception } from '../../../common/exception/exception';
import { ExceptionInline } from '../../../common/exception/exception.inline';
import { RoutePath } from '../../router/route.path';
import { AuthService } from '../auth.service';
import { AuthContext } from '../context/auth.context';
import { UserCreateDto } from '../user/types/user.create.dto';

interface Props {
  onSignupSuccess: (user: { email: string; id: string }) => void;
}

export const SignupForm = ({ onSignupSuccess }: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUserEmail, setIsAuthenticated } = useContext(AuthContext)!;

  const signupHandler = useMutation({
    mutationFn: (createDto: UserCreateDto) => {
      return AuthService.signup(createDto);
    },
    onSettled: (data) => {
      console.log({ data });
      // navigate('/');
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
      <Typography variant='h4' gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={onSignup}>
        <TextField
          id='email'
          name='email'
          label='Email'
          variant='outlined'
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id='password'
          name='password'
          label='Password'
          variant='outlined'
          fullWidth
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box>
          <Button type='submit' variant='contained' color='primary' disabled={signupLoading}>
            {signupLoading ? <CircularProgress size={24} color='secondary' /> : 'Sign Up'}
          </Button>
        </Box>
      </form>
      {signupError && <ExceptionInline error={signupError} />}
      <Box sx={{ marginTop: 2 }}>
        <Link to={RoutePath.Home} style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='secondary'>
            Return Back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
