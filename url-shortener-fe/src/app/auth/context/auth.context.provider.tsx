import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth.context';

interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const authCookie = document.cookie.split('; ').find((row) => row.startsWith('Authentication='));

    if (authCookie) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
