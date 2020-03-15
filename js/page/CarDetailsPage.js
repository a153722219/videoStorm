/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor:"#fff"
})
class CarDetailsPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });
        const {model} = this.props.navigation.state.params;
        this.model = model;
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

        let navigationBar = <NavigationBar
                title={i18n.t('carDetails')}
                statusBar={{}}
                style={{backgroundColor: "white"}}
                titleStyle = {{color:"#000",fontSize:20}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1,backgroundColor:'#F9F9F9'}}>
            {navigationBar}
           <View style={{backgroundColor:'#fff',height:500 * uW,marginTop:24 * uW,paddingLeft:46 * uW,paddingRight:37 * uW ,}}>
                <Text style={{marginTop:38 * uW,fontSize:36 * uW}}>{this.model.VehicleNo}</Text>
                <Text style={{marginTop:12 * uW,fontSize:28 * uW,color:'#B2B2B2'}}>{this.model.VehicleType || "其他"}/{this.model.ApprovedLoad+i18n.t('Tons')}/{this.model.OverallLength + i18n.t('Mi')}</Text>
                <Text style={{marginTop:30 * uW,fontSize:28 * uW,color:'#B2B2B2',height:175 * uW}}>{this.model.CorpName}，{this.model.OrgName}</Text>
                <View style={styles.numberBox}>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>{this.model.Odometer || 0}</Text>
                            <Text style={[{color:this.props.theme},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('VehicleMileage')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>{this.model.Speed || 0}</Text>
                            <Text style={[{color:this.props.theme},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('VehicleSpeed')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:this.props.theme},styles.bigTxt]}>{this.model.Oil || 0}</Text>
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
                            <Text style={[{color:'#333333'},styles.bigTxt]}>{this.model.TodayMileage || 0}</Text>
                            <Text style={[{color:'#B2B2B2'},styles.smallTxt]}>Km</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('TodayRoute')}</Text>
                    </View>
                    <View >
                        <View style={styles.numberSmallBox}>
                            <Text style={[{color:'#333333'},styles.bigTxt]}>{this.model.TodayRunTime || 0}</Text>
                            <Text style={[{color:'#B2B2B2'},styles.smallTxt]}>min</Text>
                        </View>
                        <Text style={styles.unit}>{i18n.t('TodayRunningTime')}</Text>
                    </View>
                </View>
           </View>
           <View style={{height:104*uW,backgroundColor:'#fff',marginTop:24 * uW,paddingTop:30 * uW}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:46 * uW,paddingRight:37 * uW}}>
                    <Text style={{fontSize:32 * uW}}>{i18n.t('CarDetailsTime')}</Text>
                    <Text style={{fontSize:32 * uW}}>{this.model.GPSTime}</Text>
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
