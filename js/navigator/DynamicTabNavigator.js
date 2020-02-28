/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    createAppContainer

} from 'react-navigation'
import { createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs';
// import {
//     BottomTabBar
// } from 'react-navigation-tabs'
import HomePage from '../page/HomePage'
import ManagePage from '../page/ManagePage'
import MySelfPage from '../page/MySelfPage'
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import NavigationUtil from '../navigator/NavigationUtil'
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes';
import {i18n} from '../i18n/index';

 class DynamicTabNavigator extends Component{
    constructor(props){
        super(props)
        console.disableYellowBox = true;
    }

     componentDidMount() {
         const {navigation} = NavigationUtil;
         EventBus.getInstance().addListener(EventTypes.LANGUAGE_REFRESH,  (this.languageListener = ()=> {
             // this.Tab = createAppContainer(this._tabNavigator());
             //重新渲染颜色
             navigation.setParams({theme:{
                 tintColor:this.props.theme,
                 updateTime:new Date().getTime()
             }})
         }))
     }

     componentWillUnmount() {
         EventBus.getInstance().removeListener(
             this.languageListener
         )
     }




    _tabNavigator(){
        const Tabs = { //这里配置页面路由
            HomePage:{
                screen:HomePage,
                navigationOptions:{
                    title:i18n.t('Home'),
                    tabBarIcon:({tintColor,focused})=>(
                        <Ionicons
                            name={"ios-home"}
                            size={26}
                            style={{color:tintColor}}
                        />
                    )
                }
            },
            ManagePage:{
                screen:ManagePage,
                navigationOptions:{
                    title:i18n.t('Management'),
                    tabBarIcon:({tintColor,focused})=>(
                        <Ionicons
                            name={"ios-folder"}
                            size={26}
                            style={{color:tintColor}}
                        />
                    )
                }
            },
            MySelfPage:{
                screen:MySelfPage,
                navigationOptions:{
                    title:i18n.t('Me'),
                    tabBarIcon:({tintColor,focused})=>{
                        return <Entypo
                            name={"user"}
                            size={26}
                            style={{color:tintColor}}
                        />
                    }
                }
            }
        };

        // PopularPage.navigationOptions.tabBarLabel = "最新";
        return createBottomTabNavigator(Tabs,{
            tabBarComponent:props=>{return <TabBarComponent theme={this.props.theme} {...props}/>},
            swipeEnabled:false,
            animationEnabled: false
        });
    }

    render() {
        // NavigationUtil.navigation = this.props.navigation;
        if(!this.Tab)
             this.Tab = createAppContainer(this._tabNavigator());
        const Tab = this.Tab;
        return <Tab
            onNavigationStateChange={(prevState,newState,action)=>{
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select,{
                    from:prevState.index,
                    to:newState.index
                })
                }
            }
        />
    }
}

class TabBarComponent extends React.Component{
    constructor(props){
        super(props)
        this.theme={
            tintColor:props.activeTintColor,
            updateTime:new Date().getTime()
        }
    }
    render(){
        // const {routes,index} = this.props.navigation.state;
        // if(routes[index].params){
        //     const {theme} = routes[index].params;
        //     //以最新的更新时间为主
        //     if(theme &&  theme.updateTime > this.theme.updateTime){
        //         this.theme=theme;
        //     }
        //
        // }
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    nav: state.nav,
});

export default connect(mapStateToProps)(DynamicTabNavigator);

