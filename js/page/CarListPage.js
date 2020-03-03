/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,DeviceInfo,RefreshControl,Image,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
class CarListPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
        this.state = {
            isLoading:false,
            hideLoadingMore:true,
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress(){
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    genIndicator(){
        return this.state.hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:'red',margin:10}}
                />
                <Text>加载更多</Text>
            </View>
    }

    loadData(loadMore){
        if(!loadMore){
            this.setState({
                isLoading:true
            });
            setTimeout(()=>{
                this.setState({
                    isLoading:false
                })
            },2000)
        }else{
            this.setState({
                hideLoadingMore:false
            });
            setTimeout(()=>{
                this.setState({
                    hideLoadingMore:true
                })
            },2000)
        }

    }

    render() {
        let statusBar = {
            backgroundColor: "rgba(255,255,255,1)",
            barStyle: 'dark-content', //可以将状态栏文字颜色改变
        }
       
        let navigationBar =
            <NavigationBar
                title={i18n.t('driving')}
                statusBar={statusBar}
                style={{backgroundColor: "white"}}
                titleStyle = {[{color:"#000",fontSize:20}]}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1,backgroundColor:'#F9F9F9'}} >
            {navigationBar}
            <View style={{
                flex:1
            }}>
                <FlatList
                        style={{
                            flex:1,
                            minWidth:"100%",
                            minHeight: "100%",
                        }}
                        data={[{id:1},{id:2},{id:3},{id:4}]}
                        renderItem={({item,index})=> {
                        
                            return <View style={{paddingTop:24*uW}}>
                                <TouchableOpacity onPress={(()=>{
                    
                                    NavigationUtil.goPage({},'CarDetailsPage')
                                })}>
                                    <View style={styles.item}>
                                        <Text style={{fontSize:32 * uW,marginTop:42 * uW}}>粤B87K90</Text>
                                        <View style={styles.km}>
                                            <Text style={{color:'#B2B2B2',fontSize:28 * uW}}>{i18n.t('toDayMileage')}</Text>
                                            <Text style={{color:this.props.theme,fontSize:28 * uW}}>128.90KM</Text>
                                        </View>
                                        <View style={{ flexDirection:'row',alignItems:'center'}}>
                                            <Image  style={{width:24 * uW,height:28 * uW,marginRight:10 * uW}} source={i18n.locale=='zh'?require('../assets/zh/local.png'):require('../assets/en/local.png')}></Image>
                                            <Text style={{fontSize:28 * uW,color:'#B2B2B2'}}>{i18n.t('nullCurrentLocal')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                        }}
                        keyExtractor={item=>""+item.id}
                        //下拉刷新
                        refreshControl={
                            <RefreshControl
                                title="loading"
                                titleColor="red"
                                colors={["red"]}
                                refreshing={this.state.isLoading}
                                onRefresh={()=>{this.loadData()}}
                                tintColor="red"
                            />
                        }
    
                        ListFooterComponent={()=>this.genIndicator()}
                        onEndReached={() => {
    
                            setTimeout(() => {
                                if (this.canLoadMore) {
                                    this.loadData(true);
                                    this.canLoadMore = false;
                                }}, 100)
                        }}
                        onScrollBeginDrag={() => {
                            console.log("onScrollBeginDrag")
                            this.canLoadMore = true;
                        }}
                        onMomentumScrollBegin={()=>{
                            console.log("onMomentumScrollBegin")
                            this.canLoadMore=true;
                        }}
                        onEndReachedThreshold={0.5}
                >
                </FlatList>   
                
            </View>
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(CarListPage);
//样式
const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        height:242 * uW,
        marginBottom:24 * uW,
        paddingLeft:46 * uW,
        
    },
    km:{
        flexDirection:'row',
        marginTop:12 * uW,
        marginBottom:30 * uW
    },
    indicatorContainer:{
        alignItems:"center"
    },
});
