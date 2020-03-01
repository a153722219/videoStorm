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
import {MORE_MENU} from '../common/MORE_MENU'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../res/styles/GlobalStyles'
import ViewUtil from '../util/ViewUtil';
import {i18n} from '../i18n/index';
import {connect} from "react-redux"

const THEME_COLOR = "#678"
class MySelfPage extends Component{
    static navigationOptions = ({ navigation,navigationOptions}) => {
        const label = i18n.t('Me');
        return {
            tabBarLabel:label
        }
    };


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
      backgroundColor: this.props.theme,
      barStyle: 'light-content'
     }



  let navigationBar =
      <NavigationBar
          // title={'我的'}
          statusBar={statusBar}
          style={{backgroundColor:this.props.theme}}
          // rightButton={this.getRightButton()}
          // leftButton={this.getLeftButton()}
      />

    return (
      <View style={GlobalStyles.root_container}>
          {navigationBar}
          <ScrollView
              >


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

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(MySelfPage);

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
