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
import ToastManager from './common/ToastManager'
import Toast from 'react-native-easy-toast';
import Globals from './util/Globals'
export default class App extends Component {

    constructor(props) {
        super(props)
        Globals.Android_SDK_INT = props.Android_SDK_INT
    }
  render() {
    return <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <AppNavigator />
        <ToastComponent/>
      </PersistGate>
    </Provider>
  }
}
/*全局toast*/
class ToastComponent extends React.Component {
    //防止内存泄漏
    componentWillUnmount() {
        ToastManager.toast = null;
    }

    render() {
        return (<Toast  position={'center'} ref={e => ToastManager.toast = e}/>);
    }
}

