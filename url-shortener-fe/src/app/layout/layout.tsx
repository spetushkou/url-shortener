import { Container } from '@mui/material';
import { LayoutContent } from './layout.content';
import { LayoutHeader } from './layout.header';

export function Layout() {
  return (
    <Container>
      <LayoutHeader />
      <LayoutContent />
    </Container>
  );
}
