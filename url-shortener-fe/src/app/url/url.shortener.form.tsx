import React from 'react';
import { UrlCreateDto } from './types/url.create.dto';

interface Props {
  urlState: [UrlCreateDto, React.Dispatch<React.SetStateAction<UrlCreateDto>>];
  onCreateShort: () => void;
}

export function UrlShortenerForm({ urlState, onCreateShort }: Props) {
  const [url, setUrl] = urlState;

  // form field input handler that updates the component state
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUrl((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <label htmlFor='originalUrl'>Url: </label>
        <input id='originalUrl' name='originalUrl' type='text' value={url.originalUrl} onChange={onInputChange} />
      </div>
      <div className='card'>
        <button onClick={onCreateShort}>Submit a new URL!</button>
      </div>
    </div>
  );
}
