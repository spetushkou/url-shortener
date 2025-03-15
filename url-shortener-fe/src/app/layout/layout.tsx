import { Container } from '@mui/material';
import { Content } from './content';
import { Header } from './header';

export function Layout() {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
}
