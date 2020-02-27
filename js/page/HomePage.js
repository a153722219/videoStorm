/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View,DeviceInfo,Image} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NetInfo from "@react-native-community/netinfo";
import actions from '../action/index'
import PopularItem from "../common/PopularItem";
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import {i18n} from '../i18n/index';
import ToastManager from '../common/ToastManager'
import {uW, width} from "../util/screenUtil";



 class HomePage extends Component{

     static navigationOptions = ({ navigation,navigationOptions}) => {
         const label = i18n.t('Home');
         return {
             tabBarLabel:label
         }
     };


     constructor(props){
        super(props);

     }

     componentDidMount(){
        console.log('mount')
         const unsubscribe = NetInfo.addEventListener(state=> {
             ToastManager.show('type='+ state.type +' isConnected = '+ state.isConnected);
         });

     }

     componentWillUnmount() {
         console.log('unmount')
         unsubscribe()

     };

    render() {

        let statusBar = {
            backgroundColor:this.props.theme,
            barStyle:'light-content',
        };

      let navigationBar = <NavigationBar
        title={i18n.t('Home')}
        statusBar = {statusBar}
        style={{backgroundColor:this.props.theme}}
      />


    return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
        {navigationBar}
        <View style={[styles.backCard,{backgroundColor:this.props.theme}]}>
            <Image
                style={styles.banner}
                source={require('../assets/banner.png')}
            />
        </View>



    </View>;
  }
}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch=>({
    onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
    backCard:{
        width:uW*750,
        height:uW*300,
        borderBottomLeftRadius:uW*40,
        borderBottomRightRadius:uW*40,
        marginTop:-1
    },
    banner:{
        width:uW*694,
        height:uW*330,
        borderRadius:uW*10,
        position:'absolute',
        bottom:-152*uW,
        left:28*uW
    }
});