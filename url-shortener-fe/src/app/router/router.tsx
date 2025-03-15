import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupForm } from '../auth/signup/signup.form';
import { Url } from '../url/url';

export const Router = () => {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);

  const onSignupSuccess = (userData: { email: string; id: string }) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <Container maxWidth='sm'>
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Routes>
            <Route path='/' element={<Url />} />
            <Route path='/signup' element={<SignupForm onSignupSuccess={onSignupSuccess} />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
};
