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





class TaskLinesInfo extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render() {
        return <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={styles.titleInfo}>
                    <View style={[styles.dot,{backgroundColor:this.props.theme}]}>

                    </View>
                    <Text style={styles.title}>
                        {i18n.t('tranDots')}
                    </Text>

                    <Text style={styles.subtitle}>
                        ({i18n.t('total2')}8{i18n.t('Dots')})
                    </Text>
                </View>

            </View>

            <ScrollView style={{height:239*uW}} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.dotContainer}>
                    {ViewUtil._genFinishedItem(1)}
                    {ViewUtil._genOddFinishedItem(2)}
                    {ViewUtil._genItem(3)}
                    {ViewUtil._genSelectedItem(4)}
                    {ViewUtil._genItem(5)}
                    {ViewUtil._genItem(6)}
                    {ViewUtil._genItem(7,true)}

                </View>


            </ScrollView>

            <Text style={styles.tips}>
                {i18n.t('total2')}4{i18n.t('sites')} （{i18n.t('LoadOrder')}T20191118KTX0002）:
            </Text>
            <View style={styles.addressBox}>
                <View style={{width:460*uW}}>
                    <Text style={styles.addressTitle} numberOfLines={2}>
                        华盛辉综合楼
                    </Text>
                    <Text style={styles.addressSubTitle} numberOfLines={3}>
                        广东省深圳市宝安区西乡街道盐田社区盐田街106号交叉口东南50米
                    </Text>
                </View>

                <TouchableOpacity activeOpacity={0.7}>
                    <View style={styles.previewAdr}>
                        <Image style={styles.routeIcon} source={require('../assets/zh/路线.png')}/>
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
                        {i18n.t('saler')}：
                    </Text>

                    <Text style={styles.InfoValue} >
                        周小川
                    </Text>

                </View>

                <View style={[styles.InfoItem]}>
                    <Text style={styles.InfoTitle} >
                        {i18n.t('concat')}：
                    </Text>

                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        Utils.callPhone('138000138000')
                        }
                    }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Text style={styles.Phone} >
                                138000138000
                            </Text>
                            <Image  style={styles.PhoneIcon} source={require('../assets/zh/联系方式.png')}/>
                        </View>
                    </TouchableOpacity>

                </View>


                <View style={[styles.InfoItem]}>
                    <Text style={styles.InfoTitle} >
                        {i18n.t('orderNo')}：
                    </Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        Utils.copyToClipboard('T20191118PKTX0002')
                        }
                    }>
                        <View style={{flexDirection:'row',alignItems:"center"}}>
                            <Text style={[styles.Phone,{color:"#333"}]} >
                                T20191118PKTX0002
                            </Text>
                            <Image  style={styles.copyIcon} source={require('../assets/zh/订单号.png')}/>
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
