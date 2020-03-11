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

import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import KaHangItem from '../common/KaHangItem'

class KaHangPageItem extends Component {


    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        this.state = {
            isLoading:false,
            hideLoadingMore:true
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();

    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }



    renderItem(){
        return <KaHangItem onClickRemainBtn={(id)=>{
            this.props.onClickRemainBtn(id)
        
        }}  onItemClick={()=>{this.goDetail()}}>

        </KaHangItem>
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

    goDetail(){
        NavigationUtil.goPage({},'GoTransPage')
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
                    data={[{id:1},{id:2},{id:3},{id:4}]}
                    renderItem={data=>this.renderItem(data)}
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
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(KaHangPageItem);
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