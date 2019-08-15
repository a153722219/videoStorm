/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import CollectPage from '../page/CollectPage'
import MySelfPage from '../page/MySelfPage'
export default class HomePage extends Component{
  _tabNavigator(){
      return createBottomTabNavigator({
        PopularPage:{
          screen:PopularPage
        },
        TrendingPage:{
          screen:TrendingPage
        },
        CollectPage:{
          screen:CollectPage
        },
        MySelfPage:{
          screen:MySelfPage
        }
      });
  }

  render() {
    const Tab = createAppContainer(this._tabNavigator());
    return <Tab/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
