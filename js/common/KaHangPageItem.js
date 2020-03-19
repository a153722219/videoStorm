/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,FlatList,
    RefreshControl,ActivityIndicator,Image,ScrollView
} from 'react-native';
//redux
import {connect} from "react-redux";
//国际化和适配
import {uW, width} from "../util/screenUtil";
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import actions from '../action'
import NavigationUtil from '../navigator/NavigationUtil';
import KaHangItem from '../common/KaHangItem';
import DefaultPage from '../common/DefaultPage';
import LoadingManager from '../common/LoadingManager';
// （-1无按钮，0去运输，1到达，2离开，3已离开，4去
// 装货，5去交货）

class KaHangPageItem extends Component {
    constructor(props) {
        super(props);
 

        this.state = {
            isLoading:false,
            hideLoadingMore:true
        }
        const Phone = props.user.currentUserKey.split("_")[1];
        this.statusFlag = props.statusFlag;
        this.storeKey = "items_"+Phone+"_";
        this.items = props.kahang[this.storeKey+""+props.statusFlag];
        this.items = this.items?this.items:[];
        // console.log(this.items)
        this.props.onRefreshKaHang(props.statusFlag,this.items);

    }


    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
    //    console.log(prevState)
    //     if (prevState.items !== KaHangPageItem._items(nextProps)) {   //当之前的keys和现在的keys不同时
    //         return {
    //             items: KaHangPageItem._items(nextProps),  //把新的数据赋给keys
    //         }
    //     }
        return null;
    }



    renderItem(data){
        // console.log(data)
        return <KaHangItem model={data.item} statusFlag={this.props.statusFlag} onClickRemainBtn={(PlanNO)=>{
            this.props.onClickRemainBtn(PlanNO)
        
        }}  
        onItemClick={(PlanNO)=>{
            

            this.goDetail(PlanNO)

            
        }}>

        </KaHangItem>
    }

    renderListEmptyComponent(){
        if(!this.props.network.haveNet && !this.props.kahang.isLoading){
            return <DefaultPage mode="noNet"/>;
        }else if(!this.props.kahang.isLoading){
            return <DefaultPage mode="noRec"/>;
        }else{
            return null
        }
    }



    genIndicator(){
        return this.props.kahang.hideLoadingMore?null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={{color:'red',margin:10}}
                />
                <Text>加载更多</Text>
            </View>
    }

    loadData(loadMore){
        const {PageIndex,showItems,hideLoadingMore} = this.props.kahang;
        if(!loadMore){
            this.props.onRefreshKaHang(this.statusFlag,this.items)
            
        }else if(hideLoadingMore){
           this.props.onLoadMoreKaHang(this.statusFlag,PageIndex+1,this.items,showItems);
        }

    }

    goDetail(PlanNO){
        LoadingManager.show();
        this.props.onLoadKaHangDetail(PlanNO,this.props.kahang.details,res=>{
            LoadingManager.close();
            if(res.code==600){
                NavigationUtil.goPage({model:res.data,statusFlag:this.statusFlag},'GoTransPage')
           
            }else{
                alert(res.msg || "加载失败")
            }
        },0)
      
    }

    render() {

        return <View style={styles.rootContainer}>
            <View style={{
                flex:1
            }}>
                <FlatList
                    style={{
                        flex:1,
                        minWidth:"100%",
                        minHeight: "100%",
                    }}
                    data={this.props.kahang.showItems}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={(item,index)=>""+index}
                    ListEmptyComponent={()=>this.renderListEmptyComponent()}
                    //下拉刷新
                    refreshControl={
                        <RefreshControl
                            title="loading"
                            titleColor="red"
                            colors={["red"]}
                            refreshing={this.props.kahang.isLoading}
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
                    }
                    }
                    onEndReachedThreshold={0.5}
                />
            </View>

        </View>;
    }

}

const mapStateToProps = state => ({
    user: state.user,
    theme: state.theme.theme,
    network:state.network,
    kahang:state.kahang
});

const mapDispatchToProps = dispatch => ({
    onStartTranPort:(PlanNo,Lat,Lon,Address,sourceItems,showItems,targetItem,callback)=>dispatch(actions.onStartTranPort(PlanNo,Lat,Lon,Address,sourceItems,showItems,targetItem,callback)),
    onRefreshKaHang:(statusFlag,items)=>dispatch(actions.onRefreshKaHang(statusFlag,items)),
    onLoadKaHangDetail:(PlanNO,details,callback,type)=>dispatch(actions.onLoadKaHangDetail(PlanNO,details,callback,type)),
    onLoadMoreKaHang:(statusFlag,newPageIndex,items,showItems)=>dispatch(actions.onLoadMoreKaHang(statusFlag,newPageIndex,items,showItems))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps,null,{forwardRef:true})(KaHangPageItem);
//样式
const styles = StyleSheet.create({
    lineItemBox:{
        flexDirection:'row',
        alignItems:"flex-start",
        minHeight:(114+46)*uW,
        width:450*uW
    },

    lineTitle:{
        fontSize:28*uW,
        fontWeight:"500",
        color:"#333"
    },
    lineSubTitle:{
        fontSize:24*uW,
        fontWeight:"400",
        color:"#666"
    },


    ItemText:{
        fontSize:20*uW,
        fontWeight:"500",
        // marginRight:14*uW
        width:75*uW
    },

    ItemDot:{
        marginRight:37*uW,
        width:46*uW,
        height:46*uW,
        borderRadius:23*uW

    },

    ItemLine:{
        height:114*uW,
        width:1,
        borderLeftWidth:1,
        borderLeftColor:"#979797",
        borderStyle:"dashed",
        position:'absolute',
        left:22*uW,
        top:46*uW

    },
    ItemDotText:{
        fontSize:26*uW,
        fontWeight:"400",
        lineHeight:46*uW,
        textAlign:"center",
        color:"white"
    },

    Close:{
        width:80*uW,
        height:80*uW,
        marginTop:44*uW,
        marginLeft:(672-80)/2*uW
    },

    bottomContainer:{
        paddingTop:55*uW,
        paddingBottom:45*uW,
        paddingLeft:30*uW,
        paddingRight:30*uW,
        backgroundColor:"#fff",
        borderBottomLeftRadius:20*uW,
        borderBottomRightRadius:20*uW,
    },


    PlanNO:{
        fontSize:32*uW,
        fontWeight:"500",
        lineHeight:45*uW,
        color:"white",
        marginTop:22*uW
    },

    Info:{
        fontSize:26*uW,
        fontWeight:"400",
        lineHeight:27*uW,
        color:"white",
        marginTop:5*uW
    },

    modalBox:{
        width:672*uW,
        // height:450*uW,
        backgroundColor:"white",
        borderRadius:20*uW
    },
    headBox:{
        height:265*uW,
        borderTopLeftRadius:20*uW,
        borderTopRightRadius:20*uW,
        alignItems:'center'
    },

    smallogo:{
        width:98*uW,
        height:98*uW,
        marginTop:36*uW
    },

    rootContainer:{
        flex:1,
        backgroundColor:"#f5f5f5",

    },
    indicatorContainer:{
        alignItems:"center"
    },

    navBox:{
        flexDirection:"row",
        alignItems:'center'
    },



    navItem:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#999",
        lineHeight:42*uW,
        marginLeft:54*uW
    },

    active:{
        fontSize:34*uW,
        fontWeight:"600",
        color:"#333",
        lineHeight:48*uW,
    }

});
