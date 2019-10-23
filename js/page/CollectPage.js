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
import TrendingItem from "../common/TrendingItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
const THEME_COLOR　=　"#678";
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
export default class CollectPage extends Component{
    constructor(props){
        super(props)
        this.tabNames = ["最热","趋势"];

    }



    render() {
        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content',
        };

        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar = {statusBar}
            style={{backgroundColor:THEME_COLOR}}
        />

        const TabNavigator = createMaterialTopTabNavigator({
            'Popular':{
                screen:props=> <CollectTabPage {...props} flag={FLAG_STORAGE.flag_popular}/>,
                navigationOptions:{
                    title:"最热"
                }
            },
            'Trending':{
                screen:props=> <CollectTabPage {...props} flag={FLAG_STORAGE.flag_trending}/>,
                navigationOptions:{
                    title:"趋势"
                }
            }
        },{
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
        return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
            {navigationBar}
            <Tab/>
        </View>;
    }
}

class CollectTab extends Component{
    constructor(props){
        super(props)
        const {flag} = this.props;
        this.storeName = flag;
        this.favoriteDao = new FavoriteDao(flag);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(isShowLoading){

        const {onLoadFavoriteData} = this.props;


        onLoadFavoriteData(this.storeName,isShowLoading)


    }


    renderItem(data){

        const item = data.item;
        // console.log(item.thumbURL)
        const Item = this.storeName==FLAG_STORAGE.flag_popular?PopularItem:TrendingItem

        return <Item
            projectModel={item}
            // callback用于刷新列表收藏状态
            onSelect={(callback)=>{
                NavigationUtil.goPage({
                    projectModel:item,
                    flag:this.storeName,
                    callback
                },"DetailPage")
            }
            }
            onFavorite={
                (item,isFavorite)=>{
                    FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,this.storeName)
                }
            }
        />


    }
    _store(){
        const {favorite} = this.props;
        let store = favorite[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading:false,
                projectModels:[],

            }
        }
        return store
    }



    render() {

        const store = this._store();

        return (
            <View style={styles.container}>
                <FlatList
                    style={{
                        minWidth:"100%",
                        minHeight:"100%"
                    }}
                    data={store.projectModels}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>""+(item.item.id || item.item.fullName)} //id
                    // contentContainerStyle={styles.listViewStyle}
                    // numColumns ={3}
                    refreshControl={
                        <RefreshControl
                            title="loading"
                            titleColor="red"
                            colors={["red"]}
                            refreshing={store.isLoading}
                            onRefresh={()=>{this.loadData(true)}}
                            tintColor="red"
                        />
                    }

                />

                <Toast ref={"toast"} position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = state=>({
    favorite:state.favorite
});
const mapDisPatchToProps = dispatch=>({
    onLoadFavoriteData:(storeName,isShowLoading)=>dispatch(actions.onLoadFavoriteData(storeName,isShowLoading)),

});

const CollectTabPage = connect(mapStateToProps,mapDisPatchToProps)(CollectTab);


const styles = StyleSheet.create({
    indicatorContainer:{
        alignItems:"center"
    },
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
