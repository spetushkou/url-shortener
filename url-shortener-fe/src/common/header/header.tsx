import { Typography } from '@mui/material';

interface Props {
  header: string;
}

export function Header({ header }: Props) {
  return (
    <Typography variant='h5' gutterBottom={true}>
      {header}
    </Typography>
  );
}
