/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store'




export default class App extends Component {
  render() {
    return <Provider store={store}>
      <AppNavigator/>
    </Provider>;
  }
}

const styles = StyleSheet.create({

});
