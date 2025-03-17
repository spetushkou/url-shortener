import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
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

  const clearUrl = () => {
    setUrl({
      ...url,
      originalUrl: '',
    });
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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                {url.originalUrl && (
                  <IconButton onClick={clearUrl} edge='end'>
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
      <Box>
        <Button type='submit' variant='contained' color='primary' onClick={onCreateShort}>
          Shorten
        </Button>
      </Box>
    </Box>
  );
}
