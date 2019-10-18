/** @format */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {createAppContainer} from 'react-navigation'
// import WelcomePage from './js/page/WelcomePage'
// import AppNavigator from './js/navigator/AppNavigator'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
