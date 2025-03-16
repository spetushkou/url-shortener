import { Route, Routes } from 'react-router-dom';
import { SignupForm } from '../auth/signup/signup.form';
import { RoutePath } from '../router/route.path';
import { Url } from '../url/url';

export function Content() {
  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Url />} />
      <Route path={RoutePath.Signup} element={<SignupForm />} />
    </Routes>
  );
}
