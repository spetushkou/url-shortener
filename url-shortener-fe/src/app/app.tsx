import { ExceptionHandler } from '../common/exception/exception.handler';
import { QueryProvider } from '../common/query/query.provider';
import { Layout } from './layout/layout';

export function App() {
  return (
    <ExceptionHandler>
      <QueryProvider>
        <Layout />
      </QueryProvider>
    </ExceptionHandler>
  );
}
