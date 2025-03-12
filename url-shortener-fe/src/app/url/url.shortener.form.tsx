import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { UrlCreateDto } from './types/url.create.dto';

interface Props {
  url: UrlCreateDto;
  setUrl: React.Dispatch<React.SetStateAction<UrlCreateDto>>;
  onCreateShort: () => void;
}

export function UrlShortenerForm({ url, setUrl, onCreateShort }: Props) {
  // form field input handler that updates the component state
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log({ name, value });

    setUrl((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div>
      <TextField
        sx={{ marginBottom: 2 }}
        id='originalUrl'
        name='originalUrl'
        label='Enter the URL to shorten'
        variant='outlined'
        fullWidth
        value={url.originalUrl}
        onChange={onInputChange}
      />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' color='primary' onClick={onCreateShort}>
          Shorten
        </Button>
      </Box>
    </div>
  );
}
