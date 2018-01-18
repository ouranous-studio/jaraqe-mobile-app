import { Navigation } from 'react-native-navigation';

import Home from './pages/Home';
import Game from './pages/Game';
import Login from './pages/Login';
import InstagramLogin from './pages/InstagramLogin';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('jaraqe.Home', () => Home, store, Provider);
  Navigation.registerComponent('jaraqe.Game', () => Game, store, Provider);
  Navigation.registerComponent('jaraqe.Login', () => Login, store, Provider);
  Navigation.registerComponent('jaraqe.InstagramLogin', () => InstagramLogin, store, Provider);
}