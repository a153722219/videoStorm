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
    createBottomTabNavigator,
    createAppContainer,
    BottomTabBar
} from 'react-navigation'
// import {
//     BottomTabBar
// } from 'react-navigation-tabs'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import CollectPage from '../page/CollectPage'
import MySelfPage from '../page/MySelfPage'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import NavigationUtil from '../navigator/NavigationUtil'
import {connect} from 'react-redux';

const Tabs = { //这里配置页面路由
    PopularPage:{
        screen:PopularPage,
        navigationOptions:{
            tabBarLabel:"最热",
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={"whatshot"}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
            tabBarLabel:"趋势",
            tabBarIcon:({tintColor,focused})=>(
                <Ionicons
                    name={"md-trending-up"}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    CollectPage:{
        screen:CollectPage,
        navigationOptions:{
            tabBarLabel:"收藏",
            tabBarIcon:({tintColor,focused})=>(
                <MaterialIcons
                    name={"favorite"}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    },
    MySelfPage:{
        screen:MySelfPage,
        navigationOptions:{
            tabBarLabel:"我的",
            tabBarIcon:({tintColor,focused})=>(
                <Entypo
                    name={"user"}
                    size={26}
                    style={{color:tintColor}}
                />
            )
        }
    }
};
 class DynamicTabNavigator extends Component{
    constructor(props){
        super(props)
        console.disableYellowBox = true;
    }

    _tabNavigator(){

        const {PopularPage,TrendingPage,MySelfPage,CollectPage} = Tabs;
        const tabs = {PopularPage,TrendingPage,CollectPage,MySelfPage}; //根据需要定制显示的tab
        // PopularPage.navigationOptions.tabBarLabel = "最新";
        return createBottomTabNavigator(tabs,{
            tabBarComponent:props=>{return <TabBarComponent theme={this.props.theme} {...props}/>}
        });
    }

    render() {
        // NavigationUtil.navigation = this.props.navigation;
        if(!this.Tab)
             this.Tab = createAppContainer(this._tabNavigator());
        const Tab = this.Tab;
        return <Tab/>
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
});

export default connect(mapStateToProps)(DynamicTabNavigator);

