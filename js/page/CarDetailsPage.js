/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,DeviceInfo} from 'react-native';
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
class CarDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
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


    render() {

        let statusBar = {
            backgroundColor: "rgba(255,255,255,1)",
            barStyle: 'dark-content', //可以将状态栏文字颜色改变
        }
       
        let navigationBar = <NavigationBar
                title={i18n.t('carDetails')}
                statusBar={statusBar}
                style={{backgroundColor: "white"}}
                titleStyle = {[{color:"#000",fontSize:20}]}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0,backgroundColor:'#F9F9F9'}}>
            {navigationBar}
           <View style={{backgroundColor:'#fff',height:500 * uW,marginTop:24 * uW,paddingLeft:46 * uW,paddingRight:37 * uW ,}}>
                <Text style={{marginTop:38 * uW,fontSize:36 * uW}}>粤B87K90</Text>
                <Text style={{marginTop:12 * uW,fontSize:28 * uW,color:'#B2B2B2'}}>其它/0吨/5.8米</Text>
                <Text style={{marginTop:30 * uW,fontSize:28 * uW,color:'#B2B2B2',height:175 * uW}}>深圳市前海云途物流有限公司，华强北揽件部，上海云途物流，坂田揽件部</Text>
                <View style={styles.numberBox}>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>36479</Text>
                            <Text style={[{color:this.props.theme},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('VehicleMileage')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>0</Text>
                            <Text style={[{color:this.props.theme},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('VehicleSpeed')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>50</Text>
                            <Text style={[{color:this.props.theme},styles.smallTxt]}>L</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('OilAmount')}</Text>
                    </View>
                </View>
           </View>
           <View style={{height:200 * uW,backgroundColor:'#fff',marginTop:24 * uW}}>
                <View style={[styles.numberBox,{width:80+'%',marginLeft:10+'%',marginTop:53 * uW}]}>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:'#333333'},styles.bigTxt]}>125.80</Text>
                            <Text style={[{color:'#B2B2B2'},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('TodayRoute')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:'#333333'},styles.bigTxt]}>249</Text>
                            <Text style={[{color:'#B2B2B2'},styles.smallTxt]}>min</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('TodayRunningTime')}</Text>
                    </View>
                </View>
           </View>
           <View style={{height:104*uW,backgroundColor:'#fff',marginTop:24 * uW,paddingTop:30 * uW}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:46 * uW,paddingRight:37 * uW}}>
                    <Text style={{fontSize:32 * uW}}>{i18n.t('CarDetailsTime')}</Text>
                    <Text style={{fontSize:32 * uW}}>2019/12/10 08:00</Text>
                </View>
           </View>
        </View>
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(CarDetailsPage);
//样式
const styles = StyleSheet.create({
    numberBox:{
        width:90+'%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:5+'%'
    },
    numberSmallBox:{
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'center',
    },
    smallTxt:{
        fontSize:28 * uW,

    },
    bigTxt:{
        fontSize:46 * uW,
        fontWeight:('bold', '700'),
       
    },
    unit:{
        color:'#B2B2B2',
        fontSize:26 * uW,
        width:100+'%',
        textAlign:'center',
        marginTop:12 * uW
    }
});
