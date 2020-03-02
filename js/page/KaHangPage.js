/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,FlatList,RefreshControl,ActivityIndicator,Dimensions,TouchableHighlight} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW, width} from "../util/screenUtil";
import Modal from 'react-native-translucent-modal';
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import ViewUtil from '../util/ViewUtil'
import KaHangItem from '../common/KaHangItem'
class KaHangPage extends Component {

    static Keys = [
        {
            name:i18n.t('noFinished')
        },
        {
            name:i18n.t('Pending')
        },
        {
            name:i18n.t('Finished')
        }

    ];


    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });

        this.state = {
            navActive:0,
            isLoading:false,
            hideLoadingMore:true,
            modalVisible: false
        }
    }

    componentDidMount() {
        this.backPress.componentDidMount();
        // console.log(this.NavigationBar.navBarTotalHeight)
        this.containerHeight  =Dimensions.get('window').height - this.NavigationBar.navBarTotalHeight
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }


    getLeftBackButton(){
        const leftButton =  ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')
        const RightButton =  ViewUtil.getIconButton(() => {
            NavigationUtil.goPage({},"SearchPage")
        },require('../assets/zh/待执行-搜索.png'),{marginLeft:100*uW})
        return  <View style={styles.navBox}>
                {leftButton}
                <View  style={[styles.navBox,styles.navInBox]}>
                    {
                        KaHangPage.Keys.map((item,index)=>{
                            return <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>{
                                this.setState({
                                    navActive:index
                                })
                            }}>
                                <Text style={this.state.navActive==index?[styles.navItem,styles.active,index===0?{marginLeft:0}:{}]:[styles.navItem,index===0?{marginLeft:0}:{}]}>
                                    {item.name}
                                 </Text>
                            </TouchableOpacity>
                        })

                    }
                </View>
                {RightButton}
            </View>


    }


    renderItem(){
        return <KaHangItem onClickRemainBtn={()=>{
            this.setState({ modalVisible: true });
        }}>

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

    render() {

        let statusBar = {
            backgroundColor: "rgba(0,0,0,0)",
            barStyle: 'dark-content', //可以将状态栏文字颜色改变
        }
        let navigationBar =
            <NavigationBar
                title={''}
                statusBar={statusBar}
                style={{backgroundColor: "white"}}
                leftButton={this.getLeftBackButton()}
                ref={(e)=>this.NavigationBar = e}
            />

        return <View style={styles.rootContainer}>
            {navigationBar}
            <View style={{
                height:this.containerHeight
            }}>
                <FlatList
                    style={{
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
                        console.log("onScrollBeginDrag")
                        this.canLoadMore = true;
                    }}
                    onMomentumScrollBegin={()=>{
                        console.log("onMomentumScrollBegin")
                        this.canLoadMore=true;
                    }
                    }
                    onEndReachedThreshold={0.5}
                />
            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
            >
                <View style={{ backgroundColor: "rgba(0,0,0,0.6)",flex:1}}>
                    <View>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={() => {
                                this.setState({ modalVisible: false });
                            }}
                        >
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(KaHangPage);
//样式
const styles = StyleSheet.create({
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

    navInBox:{
        marginLeft:100*uW
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
