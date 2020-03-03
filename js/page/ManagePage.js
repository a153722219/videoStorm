/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View,FlatList,ImageBackground,DeviceInfo,Image,TouchableOpacity,StatusBar} from 'react-native';
import {connect} from "react-redux"
import {createAppContainer} from "react-navigation";
import { createMaterialTopTabNavigator} from 'react-navigation-tabs';
import actions from '../action/index'
import PopularItem from "../common/PopularItem";
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import {i18n} from '../i18n/index';
import {uW} from '../util/screenUtil'
class ManagePage extends Component{
    static navigationOptions = ({ navigation,navigationOptions}) => {
        const label = i18n.t('Management');
        return {
            tabBarLabel:label,
            statusBarStyle: 'dark-content',
        }
    };


    componentDidMount() {


    }

    componentWillUnmount() {


    }


    constructor(props){
        super(props)

    }

    render() {

        let statusBar = {
            backgroundColor: "#fff",
            barStyle: 'dark-content', //可以将状态栏文字颜色改变
        }

        let navigationBar =<NavigationBar
            title={i18n.t('carManage')}
            statusBar={statusBar}
            style={{backgroundColor: "white"}}
            titleStyle = {{color:"#000",fontSize:20}}
            // rightButton={this.getRightButton()}
            // leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
        />



        return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0,backgroundColor:'#F9F9F9'}}>
            {navigationBar}
            <TouchableOpacity onPress={()=>{
             NavigationUtil.goPage({},'CarListPage')
            }}>
                <ImageBackground style={styles.mCard} source={i18n.locale=='zh'?require('../assets/zh/管理-bg.png'):require('../assets/en/management.png')}>
                    <View style={styles.iconBox} >
                        <Image style={styles.carIcon} source={require('../assets/zh/管理-车辆管理.png')}>

                        </Image>
                        <View style={styles.dot}></View>
                    </View>
                    <Text style={{fontSize:36*uW,marginTop:45*uW,marginLeft:48*uW,color:'white'}}>
                        {i18n.t("carManage")}
                    </Text>
                </ImageBackground>
            </TouchableOpacity>


        </View>;
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});
const mapDispatchToProps = dispatch=>({

});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps,mapDispatchToProps)(ManagePage);

const styles = StyleSheet.create({
    mCard:{
        width:702*uW,
        height:212*uW,
        margin:24*uW
    },
    iconBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:51*uW,
        marginLeft:48*uW,
        width:(702-48-48)*uW,
        alignItems:"flex-end"
    },
    carIcon:{
        width:44*uW,
        height:32*uW
    },
    dot:{
        width:24*uW,
        height:8*uW,
        backgroundColor:"white"
    }
});
