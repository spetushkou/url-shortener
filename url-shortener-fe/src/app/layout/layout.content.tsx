import { Route, Routes } from 'react-router-dom';
import { AuthSignin } from '../auth/signin/auth.sigin';
import { AuthSignup } from '../auth/signup/auth.signup';
import { RouterPath } from '../router/router.path';
import { Url } from '../url/url';

export function LayoutContent() {
  return (
    <Routes>
      <Route path={RouterPath.Home} element={<Url />} />
      <Route path={RouterPath.Signup} element={<AuthSignup />} />
      <Route path={RouterPath.Signin} element={<AuthSignin />} />
    </Routes>
  );
}
