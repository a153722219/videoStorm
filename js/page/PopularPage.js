/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigator/NavigationUtil'

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.tabNames = ["android","ios","java","php","apple","banana","jump","cat"];
        this.theme={
            tintColor:props.activeTintColor,
            updateTime:new Date().getTime()
        }
    }

    _genTab(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs["tab"+index] = {
                screen:props=><PopularTab {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }

            }
        });
        return tabs;
    }

  render() {
      const TabNavigator = createMaterialTopTabNavigator(this._genTab(),{
          tabBarOptions:{
              tabStyle:styles.tabstyle,
              upperCaseLabel:false,
              scrollEnabled:true,
              style:{
                  backgroundColor: "#678" //背景颜色
              },
              indicatorStyle:styles.indicatorStyle,//指示器样式
              labelStyle:styles.labelStyle //标签样式
          }
      })
      const Tab = createAppContainer(TabNavigator);
    return <View style={{flex:1,marginTop:30}}>
        <Tab/>
    </View>;
  }
}

class PopularTab extends Component{
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                  {tabLabel}

              </Text>
              <Text onPress={()=>{
                  NavigationUtil.goPage({
                      navigation:this.props.navigation
                  },"DetailPage")
              }}>跳转到详情页</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle:{
        fontSize:13,
        marginTop:6,
        marginBottom:6
    },
    indicatorStyle:{
        height:2,
        backgroundColor:"white"
    },
    tabstyle:{
        width:100
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
