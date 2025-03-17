import { Container, Typography } from '@mui/material';
import { ReturnHomeLink } from '../returnHomeLink/return.home.link';

export function ServicePageNotFound() {
  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h3' color='error'>
        404 - Not Found
      </Typography>
      <Typography variant='h6' color='textSecondary' paragraph>
        The page you are looking for does not exist.
      </Typography>
      <ReturnHomeLink />
    </Container>
  );
}
