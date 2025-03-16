import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Exception } from '../../../common/exception/exception';
import { ResponseControllerOne } from '../../../common/response/response.controller.one';
import { Cookie } from '../../cookie/cookie';
import { UserSerializeDto } from '../../user/types/user.serialize.dto';
import { AuthService } from '../auth.service';
import { AuthToken } from '../types/auth.token';
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

  const { data: meResponse, error: meError } = useQuery<ResponseControllerOne<UserSerializeDto>, Exception>(
    [`${AuthToken.BaseUrl}`, 'me'],
    async () => await AuthService.me(),
    {
      enabled: true,
    },
  );
  const meData = meResponse?.data ?? null;

  if (meError) {
    console.error(meError);
  }

  useEffect(() => {
    setIsAuthenticated(!!cookies.Authentication);
    setUserEmail(meData?.email ?? null);
  }, [cookies.Authentication, meData?.email]);

  return (
    <AuthContext.Provider value={{ userEmail, setUserEmail, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
