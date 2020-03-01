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
    const {projectModel,flag} = this.params;
    this.favoriteDao = new FavoriteDao(flag);
    this.url = projectModel.item.html_url || "https://github.com/"+projectModel.item.fullName;
    const title = projectModel.item.full_name || projectModel.item.fullName;
    this.state={
      title:title,
      url:this.url,
      canGoBack:false,
      isFavorite:projectModel.isFavorite
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

  renderRightButton(){
    return (<View style={{flexDirection:"row"}}>
        <TouchableOpacity
        onPress={()=>{}}>
            <FontAwesome
                name={!this.state.isFavorite?'star-o':'star'}
                onPress={()=>{
                    // 收藏&取消
                    const {projectModel,callback} = this.params;
                     const isFavorite = !projectModel.isFavorite;
                    callback(isFavorite)
                    this.setState({
                        isFavorite:!this.state.isFavorite
                    });
                    let key = projectModel.item.fullName?projectModel.item.fullName:projectModel.item.id;
                    if(isFavorite){
                        this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel.item))
                    }else this.favoriteDao.removeFavoriteItem(key)

                }}
                size={20}
                style={{color:'white',marginRight:10}}
            />
        </TouchableOpacity>
        {ViewUtil.getShareButton(()=>{

        })}
    </View>)
  }

  render() {
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(()=>this.onBack())}
      title={this.state.title}
      // statusBar = {statusBar}
      style={{backgroundColor:THEME_COLOR}}
      rightButton={this.renderRightButton()}
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
