/** @format */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {createAppContainer} from 'react-navigation'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
