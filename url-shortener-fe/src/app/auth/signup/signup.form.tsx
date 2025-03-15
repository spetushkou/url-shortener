import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  onSignupSuccess: (user: { email: string; id: string }) => void;
}

export const SignupForm = ({ onSignupSuccess }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        '{{URL}}/signup',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      const userData = response.data;
      onSignupSuccess(userData);
    } catch {
      setError('Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant='h4' gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={onSubmit}>
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
        <Box textAlign='center'>
          <Button type='submit' variant='contained' color='primary' disabled={loading}>
            {loading ? <CircularProgress size={24} color='secondary' /> : 'Sign Up'}
          </Button>
        </Box>
        {error && (
          <Typography color='error' sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>
      <Box sx={{ marginTop: 2 }}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='secondary'>
            Return Back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
