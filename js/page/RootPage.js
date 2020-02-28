/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {BackHandler} from "react-native";
import {connect} from 'react-redux'
import {
  createBottomTabNavigator,
  createAppContainer,
  NavigationActions
} from 'react-navigation'

import NavigationUtil from '../navigator/NavigationUtil'
import DynamicTabNavigator from '../navigator/DynamicTabNavigator'
import BackPressComponent from '../common/BackPressComponent';
import {i18n} from '../i18n/index';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'

 class RootPage extends Component{
  constructor(props){
    super(props)
    this.backPress = new BackPressComponent({
        backPress:this.onBackPress
    });
  }

     componentWillMount(){
         console.log('初始化语言&主题....')
         i18n.locale = 'zh'
         if(this.props.theme=="#EF7622"){
             i18n.locale = 'en'
         }else{
             i18n.locale = 'zh'
         }
         EventBus.getInstance().fireEvent(EventTypes.LANGUAGE_REFRESH)
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
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

  render() {
        NavigationUtil.navigation = this.props.navigation;
      // this.props.navigation.navigate("DetailPage",{})
        console.log("this.props.navigation",this.props.navigation);
        // const Tab = createAppContainer(DynamicTabNavigator);
        return <DynamicTabNavigator/>
  }
}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

export default connect(mapStateToProps)(RootPage);