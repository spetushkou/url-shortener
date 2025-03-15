import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignupForm } from '../auth/signup/signup.form';
import { UserSerializeDto } from '../auth/user/types/user.serialize.dto';
import { RoutePath } from '../router/route.path';
import { Url } from '../url/url';

export function Content() {
  const [user, setUser] = useState<UserSerializeDto | null>(null);

  const onSignupSuccess = (user: UserSerializeDto) => {
    setUser(user);
  };

  return (
    <Routes>
      <Route path={RoutePath.Home} element={<Url />} />
      <Route path={RoutePath.Signup} element={<SignupForm onSignupSuccess={onSignupSuccess} />} />
    </Routes>
  );
}
