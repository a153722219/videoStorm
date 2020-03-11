/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View,Image,TouchableOpacity,ImageBackground} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil'
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../res/styles/GlobalStyles'
import ViewUtil from '../util/ViewUtil';
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
import {connect} from "react-redux"
import  setStatusBar from '../common/setStatusBar';



@setStatusBar({
    barStyle: 'light-content',
    translucent: true
})
class MySelfPage extends Component{
    static navigationOptions = ({ navigation,navigationOptions}) => {
        const label = i18n.t('Me');
        return {
            tabBarLabel:label
        }
    };

    constructor(props){
        super(props);

        const userKey  = this.props.user.currentUserKey || "";
        this.user = this.props.user[userKey] || {};
    }


    onClick(menu){
        let RouteName,params={};
        switch (menu){
            case this.MORE_MENU.Info:
                RouteName='UserInfoPage';
                // params.title="教程";
                // params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case this.MORE_MENU.Setting:
                RouteName='SettingPage';
                break;
            case this.MORE_MENU.ChangeLang:
                RouteName='ChangeLangPage';
                break;
        }
        if(RouteName){
            NavigationUtil.goPage(params,RouteName)
        }
    }

    getItem(menu){
        return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,this.props.theme)
    }


  render() {
    this.MORE_MENU = {
        Info: { name: i18n.t('AboutMe'), icon: require('../assets/zh/userInfo.png') },
        Setting: { name: i18n.t('settingPage'), icon: require('../assets/zh/settings.png')  },
        ChangeLang: { name: i18n.t('ChangeLang'), icon: require('../assets/zh/changLang.png') },
    };


  let navigationBar =
      <NavigationBar
          // title={'我的'}
          statusBar={{}}
          style={{backgroundColor:this.props.theme}}
          // rightButton={this.getRightButton()}
          // leftButton={this.getLeftButton()}
      />

    return (
        
      <View style={[GlobalStyles.root_container,{backgroundColor:"#fff"}]}>
          {navigationBar}
          <ImageBackground style={styles.bgBox} source={i18n.locale=='zh'?require('../assets/zh/myBg.png'):require('../assets/en/bg.png')}>
              {/*<View style={styles.boxFix}>*/}
              {/*</View>*/}
              <Image  style={styles.avatar} source={require('../assets/zh/Routelogo.png')}>

              </Image>

          </ImageBackground>

          <View style={{marginTop:39*uW,paddingLeft:62*uW,paddingRight:62*uW}}>
              <Text style={{fontSize:40*uW,fontWeight:'500',marginTop:20*uW,color:"#333333"}}>{i18n.t('welCome')}{this.user.DriverName}</Text>
    <Text style={{fontSize:26*uW,fontWeight:'400',marginTop:4*uW,color:"#B2B2B2"}}>{(i18n.locale=='zh'?'':'Welcome to') + i18n.t('welComeToXY')}</Text>

              <ScrollView
                  style={{marginTop:134*uW}}
              >

                  <View style={GlobalStyles.line}/>
                  {this.getItem(this.MORE_MENU.Info)}

                  <View style={GlobalStyles.line}/>
                  {this.getItem(this.MORE_MENU.Setting)}

                  <View style={GlobalStyles.line}/>
                  {this.getItem(this.MORE_MENU.ChangeLang)}

              </ScrollView>

          </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user:state.user,
    currentUserKey:state.user.currentUserKey
});

export default connect(mapStateToProps)(MySelfPage);

const styles = StyleSheet.create({
    bgBox:{
      width:750*uW,height:323*uW,marginTop:-1
    },
    avatar:{
        width:166*uW,
        height:166*uW,
        borderRadius:83*uW,
        position:'absolute',
        left:62*uW,
        bottom:-39*uW,
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
