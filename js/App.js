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
import { PersistGate } from 'redux-persist/es/integration/react';


export default class App extends Component {
  render() {
    return <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  }
}

const styles = StyleSheet.create({

});

