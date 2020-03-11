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
import actions from '../action'
import DefaultPage from '../common/DefaultPage'
import  setStatusBar from '../common/setStatusBar';
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor:"#fff"
})
class CarListPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
    }

    componentDidMount() {
        this.loadData();
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
        return this.props.carList.hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:'red',margin:10}}
                />
                <Text>加载更多</Text>
            </View>
    }

    loadData(loadMore){
        const Phone = this.props.user.currentUserKey.split("_")[1];
        const items = this.props.carList["items_"+Phone]
        const {PageIndex,showItems,hideLoadingMore} = this.props.carList;
        if(!loadMore){
            this.props.onRefreshCars(items)
            
        }else if(hideLoadingMore){
            this.props.onLoadMoreCars(PageIndex+1,items,showItems);
        }

    }


    renderListEmptyComponent(){
        if(!this.props.network.haveNet){
            return <DefaultPage mode="noNet"/>;
        }else if(!this.props.carList.isLoading){
            return <DefaultPage mode="noRec"/>;
        }else{
            return null
        }
    }


    render() {
        const Phone = this.props.user.currentUserKey.split("_")[1];
        let items = this.props.carList["items_"+Phone]
        items = items?items:[];
        let navigationBar =
            <NavigationBar
                title={i18n.t('driving')}
                statusBar={{}}
                style={{backgroundColor: "white"}}
                titleStyle = {{color:"#000",fontSize:20}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1,backgroundColor:'#F9F9F9'}} >
            {navigationBar}
            <View style={{
                flex:1,
                paddingBottom:24*uW
            }}>
                <FlatList
                        style={{
                            flex:1,
                            minWidth:"100%",
                            minHeight: "100%"

                        }}
                        data={this.props.carList.showItems}
                        ListEmptyComponent={()=>this.renderListEmptyComponent()}
                        renderItem={({item,index})=> {
                            return <View>
                                <TouchableOpacity activeOpacity={0.6} onPress={(()=>{
                                    
                                    NavigationUtil.goPage({},'CarDetailsPage')
                                })}>
                                    <View style={styles.item}>
                                        <Text style={{fontSize:32 * uW,marginTop:42 * uW}}>{item.VehicleNo}</Text>
                                        <View style={styles.km}>
                                            <Text style={{color:'#B2B2B2',fontSize:28 * uW}}>{i18n.t('toDayMileage')}</Text>
                                            <Text style={{color:this.props.theme,fontSize:28 * uW}}>{item.Odo}KM</Text>
                                        </View>
                                        <View style={{ flexDirection:'row',alignItems:'center'}}>
                                            <Image  style={{width:24 * uW,height:28 * uW,marginRight:10 * uW}} source={i18n.locale=='zh'?require('../assets/zh/local.png'):require('../assets/en/local.png')}></Image>
                                            <Text numberOfLines={2} style={{fontSize:28 * uW,color:'#B2B2B2',flex:1}}>{item.PlaceName?item.PlaceName:i18n.t('nullCurrentLocal')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View> 
                        }}
                        keyExtractor={(item,index)=>""+index}
                        //下拉刷新
                        refreshControl={
                            <RefreshControl
                                title="loading"
                                titleColor="red"
                                colors={["red"]}
                                refreshing={this.props.carList.isLoading}
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
                          
                            this.canLoadMore = true;
                        }}
                        onMomentumScrollBegin={()=>{
                           
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
    user: state.user,
    theme: state.theme.theme,
    carList:state.cars,
    network:state.network
});

const mapDispatchToProps = dispatch => ({
    onRefreshCars:(items)=>dispatch(actions.onRefreshCars(items)),
    onLoadMoreCars:(newPageIndex,items,showItems)=>dispatch(actions.onLoadMoreCars(newPageIndex,items,showItems)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(CarListPage);
//样式
const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        height:242 * uW,
        marginTop:24 * uW,
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
