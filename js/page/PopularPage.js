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
 class PopularPage extends Component{
    constructor(props){
        super(props)
        const {onLoadLanguage} = this.props
        onLoadLanguage(FLAG_LANGUAGE.flag_key)
    }

    _genTab(){
        const tabs = {};
        const {keys} = this.props;
        keys.forEach((item,index)=>{
            if(item.checked){
                tabs["tab"+index] = {
                    screen:props=><PopularTabPage {...props} tabLabel={item.name}/>,
                    navigationOptions:{
                        title:item.name
                    }

                }
            }


        });
        return tabs;
    }

  render() {
        const {keys} = this.props;

        let statusBar = {
            backgroundColor:THEME_COLOR,
            barStyle:'light-content',
        };

      let navigationBar = <NavigationBar
        title={'最热'}
        statusBar = {statusBar}
        style={{backgroundColor:THEME_COLOR}}
      />

      const TabNavigator = keys.length>0?createAppContainer(createMaterialTopTabNavigator(this._genTab(),{
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
          },
          lazy:true
      })):null;


    return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0}}>
        {navigationBar}
        {TabNavigator &&  <TabNavigator/>}
    </View>;
  }
}

class PopularTab extends Component{
    constructor(props){
        super(props)
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.isFavoriteChanged=false;
    }

    componentDidMount() {
        this.loadData();
        EventBus.getInstance().addListener(EventTypes.favorite_change_popular,this.favoriteChangeListener=()=>{
            this.isFavoriteChanged=true;
        });
        EventBus.getInstance().addListener(EventTypes.bottom_tab_select,this.bottomTabSelectListener=(data)=>{
            if(data.to===0&&this.isFavoriteChanged){
                this.loadData(null,true)
            }
        })
    }

    componentWillUnmount() {
        EventBus.getInstance().removeListener(this.favoriteChangeListener)
        EventBus.getInstance().removeListener(this.bottomTabSelectListener)
    }

    loadData(loadMore,refreshFavorite){
        const pageSize = 10;
        const {onRefreshPopular,onLoadMorePopular,onFlushPopularFavorite} = this.props;
        const store = this._store();

        const url =this.genFetchUrl(this.storeName);
        if(loadMore){

            onLoadMorePopular(this.storeName,++store.pageIndex, pageSize,store.items,favoriteDao,(callback)=>{
                this.refs.toast.show("没有更多了")
            });
        }else if(refreshFavorite){

            onFlushPopularFavorite(this.storeName,store.pageIndex,pageSize,store.items,favoriteDao)

        } else{
            onRefreshPopular(this.storeName,url,pageSize,favoriteDao);
        }


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
        return <PopularItem
            projectModel={item}
            // callback用于刷新列表收藏状态
            onSelect={(callback)=>{
                    NavigationUtil.goPage({
                        projectModel:item,
                        flag:FLAG_STORAGE.flag_popular,
                        callback
                    },"DetailPage")
                }
            }
            onFavorite={
                (item,isFavorite)=>{
                    FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FLAG_STORAGE.flag_popular)
                }
            }
        />


    }
    _store(){
        const {popular} = this.props;
        let store = popular[this.storeName];
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
                    keyExtractor={item=>""+item.item.id} //id
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
    popular:state.popular
});
const mapDisPatchToProps = dispatch=>({
    onRefreshPopular:(storeName,url,pageSize,favoriteDao)=>dispatch(actions.onRefreshPopular(storeName,url,pageSize,favoriteDao)),
    onLoadMorePopular:(storeName,pageIndex, pageSize,items,favoriteDao,callback)=>dispatch(actions.onLoadMorePopular(
            storeName,pageIndex, pageSize,items,favoriteDao,callback
    )),
    onFlushPopularFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(actions.onFlushPopularFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
});

const PopularTabPage = connect(mapStateToProps,mapDisPatchToProps)(PopularTab);


const mapPopularStateToProps = state => ({
    keys: state.language.keys  //topNavBar数据
});
const mapPopularDispatchToProps = dispatch => ({
    onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage);

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
