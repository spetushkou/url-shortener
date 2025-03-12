import { Url } from './types/url';

interface Props {
  urlCollection: Url[];
}

export function UrlShortenerList({ urlCollection }: Props) {
  return (
    <div>
      <h1>{"URL's"}</h1>
      <div>
        {urlCollection.map((url) => {
          return <div key={url._id}>{`${url.originalUrl} with slug ${url.slug}`}</div>;
        })}
      </div>
    </div>
  );
}
