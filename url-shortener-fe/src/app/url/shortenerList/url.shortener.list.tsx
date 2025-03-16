import { Url } from '../types/url';

interface Props {
  urlCollection: Url[];
}

export function UrlShortenerList({ urlCollection }: Props) {
  return (
    <>
      <h1>{"URL's"}</h1>
      {urlCollection.map((url) => {
        return <div key={url.id}>{`${url.originalUrl} with slug ${url.slug}`}</div>;
      })}
    </>
  );
}
