/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View,Image,Text,TouchableOpacity} from 'react-native';
import {connect} from "react-redux"
import NetInfo from "@react-native-community/netinfo";
import actions from '../action/index'
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
import NavigationBar from '../common/NavigationBar';
const FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};
import  FavoriteUtil from '../util/FavoriteUtil';
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'
import {i18n} from '../i18n/index';
import ToastManager from '../common/ToastManager'
import {uW, width} from "../util/screenUtil";
import Ionicons from "react-native-vector-icons/Ionicons"
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'light-content',
    translucent: true
})
 class HomePage extends Component{

     static navigationOptions = ({ navigation,navigationOptions}) => {

         const label = i18n.t('Home');

         return {
             tabBarLabel:label
         }
     };

     static HomeMenus = [
         {
             src:require('../assets/zh/卡航.png'),
             label:'kahang',
             disabled:false
         },
         {
             src:require('../assets/zh/海外仓.png'),
             label:'haiwaicang',
             disabled:true
         },
         {
             src:require('../assets/zh/CIMS.png'),
             label:'CIMS',
             disabled:true
         },
         {
             src:require('../assets/zh/AP.png'),
             label:'AP',
             disabled:true
         }

     ];


     constructor(props){
        super(props);

     }

     componentDidMount(){

         const unsubscribe = NetInfo.addEventListener(state=> {
             ToastManager.show('type='+ state.type +' isConnected = '+ state.isConnected);
         });

     }

     componentWillUnmount() {
         console.log('unmount')
         unsubscribe()
     };

    render() {

        let navigationBar = <NavigationBar
            title={''}
            statusBar={{}}
            style={{backgroundColor:this.props.theme}}
        />


    return <View style={{flex:1}}>
        {navigationBar}
        <View style={[styles.backCard,{backgroundColor:this.props.theme}]}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                NavigationUtil.goPage({},"SearchPage")
            }}>
                <View style={styles.searchBar}>
                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/zh/home-搜索.png')}
                    />
                    <Text style={styles.searchText}>
                        {i18n.t('searchText')}
                    </Text>

                    <Image
                        style={styles.smallIcon}
                        source={require('../assets/zh/home-扫描.png')}
                    />

                </View>
            </TouchableOpacity>

                <Image
                    style={styles.banner}
                    source={require('../assets/banner.png')}
                />
        </View>


        <View style={styles.HomeMenuContainer}>

            { HomePage.HomeMenus.map((item,index)=>{
                return <TouchableOpacity  key={index} activeOpacity={0.8}  onPress={()=>{
                            if(item.disabled){
                                ToastManager.show(i18n.t('building'))
                            }else if(index==0){
                                //do something
                                NavigationUtil.goPage({},"KaHangPage")
                            }
                        }}>
                            <View style={item.disabled?[styles.MenuItem,styles.ItemDisable]:styles.MenuItem}>
                                <Image
                                    style={styles.ItemImg}
                                    source={item.src}
                                />
                                <Text style={styles.ItemText} >
                                    {i18n.t(item.label)}
                                </Text>
                            </View>
                </TouchableOpacity>
            })}


        </View>



    </View>;
  }
}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch=>({
    onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
    backCard:{
        width:uW*750,
        height:uW*300,
        borderBottomLeftRadius:uW*40,
        borderBottomRightRadius:uW*40,
        marginTop:-1
    },
    banner:{
        width:uW*694,
        height:uW*330,
        borderRadius:uW*10,
        position:'absolute',
        bottom:-152*uW,
        left:28*uW
    },
    searchBar:{
        width:uW*694,
        height:uW*86,
        borderRadius:uW*43,
        marginLeft:28*uW,
        backgroundColor:'rgba(255,255,255,0.2)',
        // opacity:0.2,
        flexDirection:'row',
        alignItems:"center"
    },
    searchText:{
        fontSize:24*uW,
        fontWeight:"400",
        width:uW*(694-162),
        color:'rgba(255,255,255,0.2)',
    },

    smallIcon:{
        width:uW*31,
        height:uW*31,
        opacity:1,
        marginLeft:25*uW,
        marginRight:25*uW
    },
    HomeMenuContainer:{
        // backgroundColor:"red",
        marginTop:228*uW,
        width:uW*646,
        marginLeft:52*uW,
        flexDirection:'row',
        justifyContent:'space-between'

    },
    MenuItem:{
        width:92*uW
    },
    ItemImg:{
        width:92*uW,
        height:92*uW,
    },
    ItemText:{
        textAlign:'center',
        color:"#333",
        fontSize:24*uW,
        fontWeight:"400"
    },
    ItemDisable:{
        opacity:0.2
    }
});