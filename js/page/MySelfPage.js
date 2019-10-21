/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

import NavigationUtil from '../navigator/NavigationUtil'

export default class MySelfPage extends Component{
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
          MySelfPage
          </Text>

        <Text onPress={()=>{
            NavigationUtil.goPage({
                navigation:this.props.navigation
            },"DetailPage")
        }}>跳转到详情页</Text>

        <Button
            title="跳转到Fetch页"
            onPress={()=>{
                NavigationUtil.goPage({
                    navigation:this.props.navigation
                },"FetchDemoPage")
            }}/>

        <Button
            title="跳转到AsyncStorage页"
            onPress={()=>{
                NavigationUtil.goPage({
                    navigation:this.props.navigation
                },"AsyncStorageDemoPage")
            }}/>

        <Button
            title="跳转到DataStorageDemoPage页"
            onPress={()=>{
                NavigationUtil.goPage({
                    navigation:this.props.navigation
                },"DataStorageDemoPage")
            }}/>
      </View>
    );
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
