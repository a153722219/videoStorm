/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Button,TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil'
const THEME_COLOR = "#678";
import {MORE_MENU} from '../common/MORE_MENU'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../res/styles/GlobalStyles'
import ViewUtil from '../util/ViewUtil'
export default class MySelfPage extends Component{


    onClick(menu){
        let RouteName,params={};
        switch (menu){
            case MORE_MENU.Tutorial:
                RouteName='WebViewPage';
                params.title="教程";
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MORE_MENU.About:
                RouteName='AboutPage';
                break;
            case MORE_MENU.About_Author:
                RouteName='AboutMePage';
                break;
        }
        if(RouteName){
            NavigationUtil.goPage(params,RouteName)
        }
    }

    getItem(menu){
        return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,THEME_COLOR)
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
          // rightButton={this.getRightButton()}
          // leftButton={this.getLeftButton()}
      />

    return (
      <View style={GlobalStyles.root_container}>
          {navigationBar}
          <ScrollView
              >
              <TouchableOpacity
                  style={styles.item}
                 onPress={()=>{
                    this.onClick(MORE_MENU.About)
                }}
              >
                  <View style={styles.about_left}>
                      <Ionicons
                          name={MORE_MENU.About.icon}
                          size={40}
                          style={{marginRight:40,color:THEME_COLOR}}

                      />
                      <Text>Github Popular</Text>

                  </View>
                  <Ionicons
                      name={'ios-arrow-forward'}
                      size={16}
                      style={{
                          marginRight:10,
                          color:THEME_COLOR,
                          alignSelf:'center'
                      }}

                  />
              </TouchableOpacity>
              <View style={GlobalStyles.line}/>
              {this.getItem(MORE_MENU.Tutorial)}
              {/*趋势管理*/}
              <Text style={styles.groupTitle}>趋势管理</Text>
              {/*自定义语言*/}
              {this.getItem(MORE_MENU.Custom_Language)}
              {/*语言排序*/}
              <View style={GlobalStyles.line} />
              {this.getItem(MORE_MENU.Sort_Language)}

              {/*最热管理*/}
              <Text style={styles.groupTitle}>最热管理</Text>
              {/*自定义标签*/}
              {this.getItem(MORE_MENU.Custom_Key)}
              {/*标签排序*/}
              <View style={GlobalStyles.line} />
              {this.getItem(MORE_MENU.Sort_Key)}
              {/*标签移除*/}
              <View style={GlobalStyles.line} />
              {this.getItem(MORE_MENU.Remove_Key)}

              {/*设置*/}
              <Text style={styles.groupTitle}>设置</Text>
              {/*自定义主题*/}
              {this.getItem(MORE_MENU.Custom_Theme)}
              {/*关于作者*/}
              <View style={GlobalStyles.line} />
              {this.getItem(MORE_MENU.About_Author)}
              <View style={GlobalStyles.line} />
              {/*反馈*/}
              {this.getItem(MORE_MENU.Feedback)}
              <View style={GlobalStyles.line} />
              {this.getItem(MORE_MENU.CodePush)}

          </ScrollView>

          {/*<Text style={styles.welcome}>*/}
          {/*MySelfPage*/}
          {/*</Text>*/}

        {/*<Text onPress={()=>{*/}
            {/*NavigationUtil.goPage({*/}
                {/*navigation:this.props.navigation*/}
            {/*},"DetailPage")*/}
        {/*}}>跳转到详情页</Text>*/}

        {/*<Button*/}
            {/*title="跳转到Fetch页"*/}
            {/*onPress={()=>{*/}
                {/*NavigationUtil.goPage({*/}
                    {/*navigation:this.props.navigation*/}
                {/*},"FetchDemoPage")*/}
            {/*}}/>*/}

        {/*<Button*/}
            {/*title="跳转到AsyncStorage页"*/}
            {/*onPress={()=>{*/}
                {/*NavigationUtil.goPage({*/}
                    {/*navigation:this.props.navigation*/}
                {/*},"AsyncStorageDemoPage")*/}
            {/*}}/>*/}

        {/*<Button*/}
            {/*title="跳转到DataStorageDemoPage页"*/}
            {/*onPress={()=>{*/}
                {/*NavigationUtil.goPage({*/}
                    {/*navigation:this.props.navigation*/}
                {/*},"DataStorageDemoPage")*/}
            {/*}}/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
    about_left:{
      flex:1,
      alignItems:'center',
      flexDirection:"row"
    },
    item:{
        height:90, padding:10,
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:"space-between",
        flexDirection:'row'
    },
    groupTitle:{
         marginLeft:10,
        marginTop:10,
        marginBottom:5,
        fontSize:12,
        color:"gray"
    }
});
