/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';

export default class WelcomePage extends Component{
        componentWillMount(){
            NavigationUtil.resetToHomePage({
                navigation:this.props.navigation
            })
        }

        componentDidMount(){


          //APP欢迎页 不需要可以注释掉timer
            // this.timer=setTimeout(()=>{
            //     // const {navigation} = this.props;
            //     NavigationUtil.resetToHomePage({
            //       navigation:this.props.navigation
            //     })
            // },1000)
        }
         componentWillUnmount(){
            this.timer && clearTimeout(this.timer);
        }


  render() {
    return (
      <View>

          <Text>
          WelcomePage
          </Text>
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
