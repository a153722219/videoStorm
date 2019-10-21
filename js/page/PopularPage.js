/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,FlatList,RefreshControl,Image} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import actions from '../action/index'

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.tabNames = ["android","ios","java","php","apple","banana","jump","cat"];

    }

    _genTab(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs["tab"+index] = {
                screen:props=><PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }

            }
        });
        return tabs;
    }

  render() {
      const TabNavigator = createMaterialTopTabNavigator(this._genTab(),{
          swipeEnabled:true,
          // tabBarPosition:"bottom",
          tabBarOptions:{
              tabStyle:styles.tabstyle,
              upperCaseLabel:false,
              scrollEnabled:true,
              animationEnabled: true,
              style:{
                  backgroundColor: "#678" //背景颜色
              },
              indicatorStyle:styles.indicatorStyle,//指示器样式
              labelStyle:styles.labelStyle //标签样式
          }
      });
      const Tab = createAppContainer(TabNavigator);
    return <View style={{flex:1,marginTop:30}}>
        <Tab/>
    </View>;
  }
}

class PopularTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        const {onLoadPopularData} = this.props;
        const url =this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName,url);
    }

    genFetchUrl(key){
        const url = "https://api.github.com/search/repositories?q="
        const sort = "&sort=stars";
        return url+key+sort;
        // return "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E7%BE%8E%E5%A5%B3&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&word=%E7%BE%8E%E5%A5%B3&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&expermode=&force=&cg=girl&pn=100&rn=100&gsm=&1571644623191="
    }

    renderItem(data){

        const item = data.item;
        // console.log(item.thumbURL)
        return <View style={{marginBottom:10}}>
            <Text style={{backgroundColor: "#faa"}}>
                {JSON.stringify(item)}
            </Text>
            {/*<Image*/}
                {/*style={{width:"100%",height:250}}*/}
                {/*source={{uri: item.thumbURL}}*/}
            {/*/>*/}
        </View>
    }


    render() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading:false
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>""+item.id} //id
                    // contentContainerStyle={styles.listViewStyle}
                    // numColumns ={3}
                    refreshControl={
                        <RefreshControl
                            title="loading"
                            titleColor="red"
                            colors={["red"]}
                            refreshing={store.isLoading}
                            onRefresh={()=>{this.loadData()}}
                            tintColor="red"
                        />
                    }
                />


            </View>
        );
    }
}

const mapStateToProps = state=>({
    popular:state.popular
});
const mapDisPatchToProps = dispatch=>({
    onLoadPopularData:(storeName,url)=>dispatch(actions.onLoadPopularData(storeName,url))
});

const PopularTabPage = connect(mapStateToProps,mapDisPatchToProps)(PopularTab);


const styles = StyleSheet.create({
        listViewStyle: {
            // 主轴方向
            flexDirection: 'row',
            // 侧轴方向
            flexWrap:"wrap",
            alignItems:'center', // 必须设置,否则换行不起作用
        },
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
