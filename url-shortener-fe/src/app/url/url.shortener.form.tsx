import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { UrlCreateDto } from './types/url.create.dto';

interface Props {
  url: UrlCreateDto;
  setUrl: React.Dispatch<React.SetStateAction<UrlCreateDto>>;
  onCreateShort: () => void;
}

export function UrlShortenerForm({ url, setUrl, onCreateShort }: Props) {
  const onOriginalUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUrl((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <Box>
      <TextField
        id='originalUrl'
        name='originalUrl'
        label='URL'
        variant='outlined'
        fullWidth
        value={url.originalUrl}
        onChange={onOriginalUrlChange}
        sx={{ marginBottom: 2 }}
      />
      <Box>
        <Button type='submit' variant='contained' color='primary' onClick={onCreateShort}>
          Shorten
        </Button>
      </Box>
    </Box>
  );
}
