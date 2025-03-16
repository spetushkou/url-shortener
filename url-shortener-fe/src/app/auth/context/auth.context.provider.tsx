import { ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../../common/cookie/cookie';
import { AuthContext } from './auth.context';

interface Props {
  children: ReactNode;
}

interface CookieValues {
  Authentication?: string;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [cookies] = useCookies<Cookie.Authentication, CookieValues>([Cookie.Authentication]);

  useEffect(() => {
    setIsAuthenticated(!!cookies.Authentication);
  }, [cookies.Authentication]);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
