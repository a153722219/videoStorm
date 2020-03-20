/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Image,TouchableOpacity,ScrollView} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW} from "../util/screenUtil";
import ViewUtil from '../util/ViewUtil'
import Utils from  '../util/Utils'
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'

import openMap from 'react-native-open-maps';



class TaskLinesInfo extends Component {

    constructor(props) {
        super(props);
        this.state={
            currentLine:0
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        const newCurrentLine = nextState.currentLine;
        if(nextState.currentLine !== this.state.currentLine){
            this.props.onCurrentSelectedChange(newCurrentLine)
        }
        
        return true
    }

    _goToYosemite(FullAddress) {
        openMap({ 
            // latitude: lat, 
            // longitude:lon,
            navigate_mode:"navigate",
            query:FullAddress,
            // end:"中国广东省广州市白云区天天来生活超市"
         });
      }


    render() {
        const currentItem = this.props.LineList[this.state.currentLine];
        // currentItem = currentItem?currentItem:{}
        return <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={styles.titleInfo}>
                    <View style={[styles.dot,{backgroundColor:this.props.theme}]}>

                    </View>
                    <Text style={styles.title}>
                        {i18n.t('tranDots')}
                    </Text>

                    <Text style={styles.subtitle}>
                                ({i18n.t('total2')}{this.props.LineList.length}{i18n.t('Dots')})
                    </Text>
                </View>

            </View>

            <ScrollView style={{height:239*uW}} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.dotContainer}>
                   { this.props.LineList.map((item,index)=>{
                    //    1到达，2离开，3已离开，4去装货，5去交货(卸货)
                        const noLine = index==this.props.LineList.length-1;
                        
                        if(item.OpBtnCode==3){
                            if(item.NeedReceiptOrdCount>0){
                                //完成未回单
                                return ViewUtil._genOddFinishedItem.call(this,index+1,noLine)
                            }

                            return ViewUtil._genFinishedItem.call(this,index+1,noLine)
                        }

                       
                        if(index==this.state.currentLine){
                            return ViewUtil._genSelectedItem(index+1,noLine)
                        }
                        return ViewUtil._genItem.call(this,index+1,noLine)
                   })} 

    

                </View>

            </ScrollView>

            <Text style={styles.tips} numberOfLines={2}>
                {i18n.t('total2')}{this.props.LineList.length}{i18n.t('sites')} （{currentItem.LoadOrdCount>0?i18n.t('LoadOrder'):i18n.t('OffLoadOrder')}{currentItem.WaybillNOs}）:
            </Text>
            <View style={styles.addressBox}>
                <View style={{width:460*uW}}>
                    <Text style={styles.addressTitle} numberOfLines={2}>
                        {currentItem.AreaName}
                    </Text>
                    <Text style={styles.addressSubTitle} numberOfLines={3}>
                        {currentItem.FullAddress}
                    </Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                    this._goToYosemite(currentItem.FullAddress)
                }}>
                    <View style={styles.previewAdr}>
                        <Image style={styles.routeIcon} source={require('../assets/zh/Route.png')}/>
                        <Text style={styles.route} >
                            {i18n.t('Route')}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.line}/>

            <View style={styles.infoBox}>
                <View style={[styles.InfoItem,{marginTop:0}]}>
                    <Text style={styles.InfoTitle} >
                     {currentItem.LoadOrdCount>0?i18n.t('saler'):i18n.t('Receiver')}：
                    </Text>

                    <Text style={styles.InfoValue} >
                        {currentItem.LoadOrdCount>0?currentItem.ShipperName:currentItem.ReceiverName}
                    </Text>

                </View>

                <View style={[styles.InfoItem]}>
                    <Text style={styles.InfoTitle} >
                        {i18n.t('concat')}：
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        const phone  = currentItem.LoadOrdCount>0?currentItem.ShipperPhone:currentItem.ReceiverPhone;
                        Utils.callPhone(phone)
                        }
                    }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Text style={styles.Phone} >
                                {currentItem.LoadOrdCount>0?currentItem.ShipperPhone:currentItem.ReceiverPhone}
                            </Text>
                            <Image  style={styles.PhoneIcon} source={require('../assets/zh/phone.png')}/>
                        </View>
                    </TouchableOpacity>

                </View>


                <View style={[styles.InfoItem]}>
                    <Text style={styles.InfoTitle} >
                        {i18n.t('orderNo')}：
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        Utils.copyToClipboard(currentItem.WaybillNOs)
                        }
                    }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Text style={[styles.Phone,{color:"#333"}]} >
                                {currentItem.WaybillNOs}
                            </Text>
                            <Image  style={styles.copyIcon} source={require('../assets/zh/orderNo.png')}/>
                        </View>
                    </TouchableOpacity>

                </View>



            </View>



        </View>;
    }

}

const mapStateToProps = state => ({
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(TaskLinesInfo);
//样式
const styles = StyleSheet.create({
    dotContainer:{
        flexDirection:"row",
        alignItems:"flex-start",
        justifyContent:"center",
        minWidth:634*uW,
        overflow:"visible"
    },

    PhoneIcon:{
        width:25*uW,
        height:25*uW
    },

    copyIcon:{
        width:22*uW,
        height:22*uW
    },
    Phone:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#438DEF",
        marginRight:17*uW
    },

    InfoItem:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        marginTop:46*uW
    },

    InfoTitle:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#999",

    },

    InfoValue:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#333",
    },
    line:{
        height:2*uW,
        backgroundColor:"#e5e5e5",
        marginTop:48*uW,
        marginLeft:22*uW,
        width:643*uW
    },

    previewAdr:{
        width:150*uW,
        height:60*uW,
        backgroundColor:"#438DEF",
        borderRadius:30*uW,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center'
    },

    routeIcon:{
        width:18*uW,
        height:30*uW,
    },

    route:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#fff",
        marginLeft:5*uW
    },

    addressBox:{
        marginTop:54*uW,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        paddingLeft:22*uW,
        paddingRight:22*uW
    },

    infoBox:{
        marginTop:52*uW,
        paddingLeft:22*uW,
        paddingRight:22*uW
    },

    addressTitle:{
        fontSize:32*uW,
        fontWeight:"500",
        color:"#333",
    },
    addressSubTitle:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#666",
        marginTop:8*uW
    },
    tips:{
        fontSize:28*uW,
        fontWeight:"500",
        color:"#333",
        marginLeft:22*uW
    },

    titleInfo:{
        flexDirection:"row",
        alignItems:"center"
    },
    dot:{
        width:8*uW,
        height:26*uW,
        marginRight:14*uW
    },
    title:{

        fontSize:30*uW,
        fontWeight:"400",
        color:"#333",
        marginRight:18*uW
    },

    subtitle:{
        fontSize:26*uW,
        fontWeight:"400",
        color:"#999",
    },
    container:{
        // height:454*uW,
        marginTop:24*uW,
        backgroundColor:"#fff",
        padding:40*uW,
        paddingTop:30*uW,
        paddingBottom:23*uW,
        marginBottom:190*uW
    },
    titleView:{
        flexDirection:"row",
        alignItems:"center"
    }
});
