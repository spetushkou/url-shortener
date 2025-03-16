import { CookiesProvider } from 'react-cookie';
import { ExceptionHandler } from '../common/exception/exception.handler';
import { QueryProvider } from '../common/query/query.provider';
import { AuthContextProvider } from './auth/context/auth.context.provider';
import { Layout } from './layout/layout';
import { Router } from './router/router';

export function App() {
  return (
    <ExceptionHandler>
      <CookiesProvider>
        <QueryProvider>
          <AuthContextProvider>
            <Router>
              <Layout />
            </Router>
          </AuthContextProvider>
        </QueryProvider>
      </CookiesProvider>
    </ExceptionHandler>
  );
}
