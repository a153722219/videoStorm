/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View,TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../common/NavigationBar'
import ViewUtil from '../util/ViewUtil'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import FavoriteDao from '../expand/dao/FavoriteDao';
const THEME_COLOR = "#678";
export default class DetailPage extends Component{
  constructor(props){
    super(props)
    this.params = this.props.navigation.state.params;
    const {title,url} = this.params;
    this.state={
      title:title,
      url:url,
      canGoBack:false
    }

    console.log("详情载入:"+this.url)
    this.backPress = new BackPressComponent({
      backPress:()=>this.onBackPress()
  });
  }


  componentDidMount() {
      this.backPress.componentDidMount();
  }

  componentWillUnmount() {
      this.backPress.componentWillUnmount();
  }
 /**
  * 处理 Android 中的物理返回键
  * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
  * @returns {boolean}
  */
 //物理返回键
  onBackPress(){
    this.onBack();
    return true;
  }
 //顶部返回键处理
  onBack(){
      if(this.state.canGoBack){
        this.webView.goBack();
      }else{
        NavigationUtil.goBack(this.props.navigation)
      }
  }

  onNavigationStateChange(e){
    console.log(e)
    this.setState({
      canGoBack:e.canGoBack,
      url:e.url
    })
  }



  render() {
    let navigationBar = <NavigationBar

      title={this.state.title}
      style={{backgroundColor:THEME_COLOR}}
      leftButton={ViewUtil.getLeftBackButton(()=>this.onBackPress())}
   />

    return (
      <View style={styles.container}>
          {navigationBar}

          <View style={{width:"100%",height:"100%",overflow:'hidden'}}>
          <WebView
            ref={webView=>this.webView=webView}
            startInLoadingState={true}
            onNavigationStateChange={e=>{
              this.onNavigationStateChange(e)
            }}
            
            source={{uri:this.state.url}}
          />

          </View>
          
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
