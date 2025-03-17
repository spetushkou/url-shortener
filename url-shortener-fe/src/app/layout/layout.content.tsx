import { Route, Routes } from 'react-router-dom';
import { ServicePageNotFound } from '../../common/servicePage/service.page.not.found';
import { AuthSignin } from '../auth/signin/auth.sigin';
import { AuthSignup } from '../auth/signup/auth.signup';
import { RouterPath } from '../router/router.path';
import { Url } from '../url/url';
import { UrlShortenerHistory } from '../url/url.shortener.history';
import { UrlRedirect } from '../url/urlRedirect/url.redirect';

export function LayoutContent() {
  return (
    <Routes>
      <Route path={RouterPath.Home} element={<Url />} />
      <Route path={RouterPath.NotFound} element={<ServicePageNotFound />} />
      <Route path={RouterPath.Signup} element={<AuthSignup />} />
      <Route path={RouterPath.Signin} element={<AuthSignin />} />
      <Route path={RouterPath.History} element={<UrlShortenerHistory />} />
      <Route path=':slug' element={<UrlRedirect />} />
    </Routes>
  );
}
