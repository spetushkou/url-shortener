import { Route, Routes } from 'react-router-dom';
import { AuthSignup } from '../auth/signup/auth.signup';
import { RouterPath } from '../router/router.path';
import { Url } from '../url/url';

export function LayoutContent() {
  return (
    <Routes>
      <Route path={RouterPath.Home} element={<Url />} />
      <Route path={RouterPath.Signup} element={<AuthSignup />} />
    </Routes>
  );
}
