/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import NavigationBar from '../common/Navigationbar';
import NavigationUtil from '../navigator/NavigationUtil'
const THEME_COLOR = "#678";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather";

export default class MySelfPage extends Component{

  getRightButton(){
    return <View style={{flexDirection:"row"}}>
      <TouchableOpacity
        onPress={()=>{}}
      >
          <View style={{padding:5,marginRight:8}}>
            <Feather
              name={'search'}
              size={24}
              style={{color:"white"}}
            />
          </View>
      </TouchableOpacity>
    </View>
  }
  getLeftButton(callback){
    return (<TouchableOpacity
      style={{padding:8,marginLeft:12}}
      onPress={callback}
    >
          <Ionicons
             name={'ios-arrow-back'}
             size={26}
             style={{color:"white"}}
          />
     
    </TouchableOpacity>)
  }
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content'
  }

  let navigationBar =
      <NavigationBar
          title={'我的'}
          statusBar={statusBar}
          style={{backgroundColor:THEME_COLOR}}
          rightButton={this.getRightButton()}
          leftButton={this.getLeftButton()}
      />





    return (
      <View style={styles.container}>
          {navigationBar}
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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
