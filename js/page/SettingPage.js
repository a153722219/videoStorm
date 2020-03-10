/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Image ,TouchableOpacity,Button} from 'react-native';
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
import actions from '../action/index'
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true
})
class settingPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress:()=>this.onBackPress()
        });

        const userKey  = this.props.user.currentUserKey || "";
        this.user = this.props.user[userKey] || {};
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

    LogOut(){
        this.props.onUserLogout();
        setTimeout(()=>{
            NavigationUtil.RootNavigation.navigate("Init");
        },100)
        
    }


    render() {
        

        let navigationBar =
            <NavigationBar
                title={i18n.t('settingPage')}
                statusBar={{}} //hidden:true
                style={{backgroundColor: "white"}}
                titleStyle = {{color:"#000",fontSize:20}}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <View style={{flex:1}}>
            {navigationBar}
           <View style={styles.box}>
               <View style={styles.item}>
                   <Text style={[styles.font32,{color:'#BBB'}]}> {i18n.t('account')} </Text>
                   <Text style={styles.font32}> {this.user.Phone} </Text>
               </View>
               <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                   NavigationUtil.goPage({},'ChangePasswordPage')
               }}>
                    <View style={[styles.item,{borderBottomWidth:0}]}>
                        <Text style={[styles.font32,{color:'#BBB'}]}> {i18n.t('setPassword')} </Text>
                        <Image style={{width:12 * uW,height:20 * uW}}  source={require('../assets/zh/right.png')}></Image>
                    </View>
               </TouchableOpacity>
           </View>

           <TouchableOpacity activeOpacity={0.6} style={{marginTop:`100%`}} onPress={()=>{this.LogOut()}}>
             <View style={[styles.myBtn,{backgroundColor:this.props.theme}]}> 
                 <Text style={{color:'#fff',fontSize:34 * uW}}>{i18n.t('logout')}</Text>
             </View>
           </TouchableOpacity>
         
        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme,
    user:state.user
});

const mapDispatchToProps = dispatch => ({
    onUserLogout:()=>dispatch(actions.onUserLogout())
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(settingPage);
//样式
const styles = StyleSheet.create({
    box:{
        paddingLeft:45 * uW,
        paddingRight:45 * uW
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:100 * uW,
        borderBottomWidth:2* uW ,
        borderColor:'#E5E5E5',
        borderStyle:'solid',
    },
    font32:{
        fontSize:32 * uW
    },
    myBtn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:`90%`,
        height:80 * uW,
        borderRadius:80 * uW,
        marginLeft:`5%`,
    
    }
});
