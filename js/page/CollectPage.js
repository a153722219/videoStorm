/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';



export default class CollectPage extends Component{
  render() {
      const {navigation}  = this.props;
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
          CollectPage
          </Text>
          <Button title="改变主题色" onPress={()=>{
              navigation.setParams({
                  theme:{
                      tintColor:"green",
                      updateTime:new Date().getTime()
                  }
              })
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
