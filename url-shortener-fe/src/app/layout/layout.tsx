import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import { Header } from '../header/header';

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>{children}</Box>
    </Container>
  );
}
