import ForgotPAsswordAuth from '../pages/auth/forgotpassword.auth';
import ResetPasswordAuth from '../pages/auth/resetpassword.auth';
import SignInAuth from '../pages/auth/signin.auth';
import SignUpAuth from '../pages/auth/signup.auth';
import VerifyAuth from '../pages/auth/verify.auth';
import Cookies from 'js-cookie';

const email = Cookies.get('email');

var authRoutes = [
  {
    path: '/signin',
    title: 'Sign In',
    desc: 'Some descriptions are the things',
    component: SignInAuth,
    layout: '/auth',
  },
  {
    path: '/signup',
    title: 'Sign Up',
    desc: 'Some descriptions are the things',
    component: SignUpAuth,
    layout: '/auth',
  },
  {
    path: '/forgot-password',
    title: 'Forgot Password',
    desc:
      'Please enter the email you used during signup to reset your password',
    component: ForgotPAsswordAuth,
    layout: '/auth',
  },
  {
    path: '/verify',
    title: '',
    desc: `Enter the 6-digit code sent to ${email}`,
    component: VerifyAuth,
    layout: '/auth',
  },
  {
    path: '/reset-password',
    title: 'Reset Password',
    desc: 'Enter the 6-digit code sent to colourm@gmail.com',
    component: ResetPasswordAuth,
    layout: '/auth',
  },
];
export default authRoutes;
