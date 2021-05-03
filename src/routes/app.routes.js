import AcceptInviteApp from '../pages/app/accept_invite.app';
import BellsApp from '../pages/app/bells.app';
import CardsApp from '../pages/app/cards.app';
import HomeApp from '../pages/app/home.app';
import ProfileApp from '../pages/app/profile.app';

var appRoutes = [
  {
    path: '/home',
    title: 'Home',
    component: HomeApp,
    layout: '/app',
  },
  {
    path: '/cards/:id',
    title: 'Cards',
    component: CardsApp,
    layout: '/app',
  },
  {
    path: '/bells',
    title: 'Notifications',
    component: BellsApp,
    layout: '/app',
  },
  {
    path: '/invites/:card',
    title: 'Accept Invite',
    component: AcceptInviteApp,
    layout: '/app',
  },
  {
    path: '/me',
    title: 'Profile',
    component: ProfileApp,
    layout: '/app',
  },
];
export default appRoutes;
