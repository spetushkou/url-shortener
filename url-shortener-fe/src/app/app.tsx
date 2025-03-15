import { ExceptionHandler } from '../common/exception/exception.handler';
import { QueryProvider } from '../common/query/query.provider';
import { Router } from './router/router';

export function App() {
  return (
    <ExceptionHandler>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </ExceptionHandler>
  );
}
