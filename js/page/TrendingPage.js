/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {DeviceEventEmitter, StyleSheet, Text, View,FlatList,RefreshControl,TouchableOpacity, ActivityIndicator,DeviceInfo} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import actions from '../action/index'
import TrendingItem from "../common/TrendingItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import TrendingDialog,{TimeSpans} from '../common/TrendingDialog';
import NavigationUtil from '../navigator/NavigationUtil';
const THEME_COLOR　=　"#678";
const EVENT_TIME_SPAN_CHANGE = "EVENT_TIME_SPAN_CHANGE";
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_trending);
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
export default class TrendingPage extends Component{
    constructor(props){
        super(props)
        this.tabNames = ["All","C","C#","PHP","JavaScript"];
        this.state={
            timeSpan:TimeSpans[0]
        }
    }
    /**
     * 渲染tab
     * 
     */
    _genTab(){
        const tabs = {};
        this.tabNames.forEach((item,index)=>{
            tabs["tab"+index] = {
                screen:props=><TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item}/>,
                navigationOptions:{
                    title:item
                }

            }
        });
        return tabs;
    }
    /**
     * 选中时间区间事件
     */
    onSelectTimeSpan(tab){
        this.dialog.dismiss();
        this.setState({
            timeSpan:tab
        })
        DeviceEventEmitter.emit(EVENT_TIME_SPAN_CHANGE,tab);
    }
    /**
     * 渲染顶部弹框
     */
    renderTrendingDialog(){
        return <TrendingDialog
            ref={dialog=>this.dialog=dialog}
            onSelect={tab=>{
                this.onSelectTimeSpan(tab)
            }}
        />
    }


    renderTitleView(){
        return <View>
            <TouchableOpacity
                underlayColor="transparent"
                onPress={()=>{this.dialog.show()}}
            >
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{
                        fontSize:18,
                        color:"#FFFFFF",
                        fontWeight:"400"
                    }}>趋势 {this.state.timeSpan.showText}</Text>

                    <MaterialIcons
                        name={'arrow-drop-down'}
                        size={22}
                        style={{color:'white'}}
                    />
                </View>
                   
            </TouchableOpacity>
        </View>
    }

    _tabNav(){
        if(!this.tabNav) {
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(this._genTab(),{
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
            }));
        }
        return this.tabNav
    }

  render() {
        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content',
        };

      let navigationBar = <NavigationBar
        titleView={this.renderTitleView()}
        statusBar = {statusBar}
        style={{backgroundColor:THEME_COLOR}}
      />

     const Tab = this._tabNav();
    return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
        {navigationBar}
        <Tab/>
        {this.renderTrendingDialog()}
    </View>;
  }
}

class TrendingTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel,timeSpan} = this.props;
        this.storeName = tabLabel;
        this.timeSpan = timeSpan;
    }


    componentDidMount() {
        this.loadData();
        this.timeSpanChangeEventListener = DeviceEventEmitter.addListener(EVENT_TIME_SPAN_CHANGE,(tab)=>{
            this.timeSpan = tab;
            this.loadData();
        });
        EventBus.getInstance().addListener(EventTypes.favorite_change_trending,this.favoriteChangeListener=()=>{
            this.isFavoriteChanged=true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.bottomTabSelectListener=(data)=>{
            if(data.to===1&&this.isFavoriteChanged){
                this.loadData(null,true)
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener)
        EventBus.getInstance().removeListener(this.bottomTabSelectListener)
        if(this.timeSpanChangeEventListener)
            this.timeSpanChangeEventListener.remove();
    }



    loadData(loadMore,refreshFavorite){
        const pageSize = 10;
        const {onRefreshTrending,onLoadMoreTrending,onFlushTrendingFavorite} = this.props;
        const store = this._store();
        const url =this.genFetchUrl(this.storeName);
        if(loadMore){
            console.log(pageSize)
            onLoadMoreTrending(this.storeName,++store.pageIndex, pageSize,store.items,favoriteDao,(callback)=>{
                this.refs.toast.show("没有更多了")
            });
        }else if(refreshFavorite){

            onFlushTrendingFavorite(this.storeName,store.pageIndex,pageSize,store.items,favoriteDao)

        } else{
          onRefreshTrending(this.storeName,url,pageSize,favoriteDao);
        }


    }

    genFetchUrl(key){
        const url = "https://github.com/trending/"
        const sort = '?'+this.timeSpan.searchText;
        key = key=="All"?"":key;

        return url+key+sort;
        // return "https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E7%BE%8E%E5%A5%B3&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&word=%E7%BE%8E%E5%A5%B3&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&expermode=&force=&cg=girl&pn=100&rn=100&gsm=&1571644623191="
    }

    renderItem(data){

        const item = data.item;
     
        return <TrendingItem
            projectModel={item}
            onSelect={(callback)=>{
                    NavigationUtil.goPage({
                        projectModel:item,
                        flag:FLAG_STORAGE.flag_trending,
                        callback
                    },"DetailPage")
                }
            }
            onFavorite={
                (item,isFavorite)=>{
                    FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_trending)
                }
            }
        />

    }
    _store(){
        const {trending} = this.props;
        let store = trending[this.storeName];
        if(!store){
            store = {
                items:[],
                isLoading:true,
                projectModel:[],
                hideLoadingMore:true
            }
        }
        return store
    }

    genIndicator(){
        return this._store().hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:'red',margin:10}}
                />
                <Text>加载更多</Text>
            </View>
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
                    data={store.projectModel}
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
                            onRefresh={()=>{this.loadData()}}
                            tintColor="red"
                        />
                    }

                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={()=>{
                        if(this.canLoadMore){
                            this.loadData(true);
                            this.canLoadMore=false;
                        }


                    }}
                    onMomentumScrollBegin={()=>{
                        //初始化页面时调用
                        this.canLoadMore=true;
                        }
                    }
                    onEndReachedThreshold={0.5}
                />

            <Toast ref={"toast"} position={'center'}/>
            </View>
        );
    }
}

const mapStateToProps = state=>({
    trending:state.trending
});
const mapDisPatchToProps = dispatch=>({
    onRefreshTrending:(storeName,url,pageSize,favoriteDao)=>dispatch(actions.onRefreshTrending(storeName,url,pageSize,favoriteDao)),
    onLoadMoreTrending:(storeName,pageIndex, pageSize,items,favoriteDao,callback)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex, pageSize,items,favoriteDao,callback)),
    onFlushTrendingFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(actions.onFlushTrendingFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
});

const TrendingTabPage = connect(mapStateToProps,mapDisPatchToProps)(TrendingTab);


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
