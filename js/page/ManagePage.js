/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,FlatList,RefreshControl,Image, ActivityIndicator,DeviceInfo} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import actions from '../action/index'
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
const THEME_COLOR　=　"#678";
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
class ManagePage extends Component{
    constructor(props){
        super(props)

    }

    render() {

        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content',
        };

        let navigationBar = <NavigationBar
            title={'管理'}
            statusBar = {statusBar}
            style={{backgroundColor:THEME_COLOR}}
        />


        return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
            {navigationBar}

        </View>;
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps)(ManagePage);

const styles = StyleSheet.create({

});
