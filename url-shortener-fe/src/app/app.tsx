import { ExceptionHandler } from '../common/exception/exception.handler';
import { QueryProvider } from '../common/query/query.provider';
import { AuthContextProvider } from './auth/context/auth.context.provider';
import { Layout } from './layout/layout';
import { Router } from './router/router';

export function App() {
  return (
    <ExceptionHandler>
      <QueryProvider>
        <AuthContextProvider>
          <Layout>
            <Router />
          </Layout>
        </AuthContextProvider>
      </QueryProvider>
    </ExceptionHandler>
  );
}
