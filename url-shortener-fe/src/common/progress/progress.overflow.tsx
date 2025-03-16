import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  message?: string;
}

export function ProgressOverflow({ message }: Props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 100,
      }}
    >
      <CircularProgress size={50} color='primary' />
      <Typography variant='h6' sx={{ marginTop: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}
