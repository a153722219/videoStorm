/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigator';
import store from './store'
import { PersistGate } from 'redux-persist/es/integration/react';
import ToastManager from './common/ToastManager'
import LoadingManager from './common/LoadingManager'
import LoadingComponent from './common/LoadingComponent'
import Toast from 'react-native-easy-toast';
import Globals from './util/Globals';

export default class App extends Component {

  constructor(props) {
      super(props)
      Globals.Android_SDK_INT = props.Android_SDK_INT;
      Globals.store = store.store;
  }
  render() {
    return <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <AppNavigator />
        <ToastComponent/>
        <LoadingComponent ref={e => LoadingManager.loading = e}/>
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

