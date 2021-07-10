import Cookies from 'js-cookie';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import AcceptInviteApp from '../pages/app/accept_invite.app';
import BellsApp from '../pages/app/bells.app';
import CardsApp from '../pages/app/cards.app';
import HomeApp from '../pages/app/home.app';
import InfoApp from '../pages/app/info.app';
import ProfileApp from '../pages/app/profile.app';
import ForgotPAsswordAuth from '../pages/auth/forgotpassword.auth';
import ResetPasswordAuth from '../pages/auth/resetpassword.auth';
import SignInAuth from '../pages/auth/signin.auth';
import SignUpAuth from '../pages/auth/signup.auth';
import VerifyAuth from '../pages/auth/verify.auth';
import ScrollToTop from './scroll.routes';

export default function RouterConfig() {
  return (
    <Router>
      <RoutesConfig />
    </Router>
  );
}

// Work around authentications
function PrivateRoute({ children, exact, ...rest }) {
  const user = Cookies.get('id');
  let history = useHistory();
  return (
    <Route
      {...rest}
      exact
      render={({ location }) =>
        user
          ? children
          : history.push(`/auth/signin?next_url=${location.pathname}`)
      }
    />
  );
}

function RoutesConfig() {
  return (
    <ScrollToTop>
      <Switch>
        {/* Auth Routes */}
        <Route exact path="/auth/signin">
          <SignInAuth />
        </Route>
        <Route exact path="/auth/signup">
          <SignUpAuth />
        </Route>
        <Route exact path="/auth/forgot-password">
          <ForgotPAsswordAuth />
        </Route>
        <Route exact path="/auth/reset-password">
          <ResetPasswordAuth />
        </Route>
        <Route exact path="/auth/verify">
          <VerifyAuth />
        </Route>

        {/* App Routes */}
        <PrivateRoute exact path="/">
          <HomeApp />
        </PrivateRoute>
        <PrivateRoute exact path="/cards/:id">
          <CardsApp />
        </PrivateRoute>
        <PrivateRoute exact path="/cards/:id/info">
          <InfoApp />
        </PrivateRoute>
        <PrivateRoute exact path="/bells">
          <BellsApp />
        </PrivateRoute>
        <PrivateRoute exact path="/invites/:card">
          <AcceptInviteApp />
        </PrivateRoute>
        <PrivateRoute exact path="/me">
          <ProfileApp />
        </PrivateRoute>
      </Switch>
    </ScrollToTop>
  );
}
