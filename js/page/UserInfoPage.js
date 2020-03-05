/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,ScrollView} from 'react-native';
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
    barStyle: 'light-content',
    translucent: true
})
class UserInfoPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list:[1,2,3,4,5]
        },
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

        let navigationBar =
            <NavigationBar
                title = {i18n.t('userInfoTitle')}
                style={{backgroundColor:'#FFF'}}
                titleStyle = {{color:"#000",fontSize:20}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),'#000000')}
            />

        return <ScrollView style={{flex:1,backgroundColor:'#F9F9F9'}}>
            {navigationBar}
            <View style={styles.topBox}>
                <View style={styles.item}>
                   <Text style={[styles.font32,{color:'#999'}]}>{i18n.t('userInfoName')}</Text>
                   <Text style={styles.font32}>孙云平</Text>
                </View>
                <View style={[styles.item,{borderBottomWidth:0}]}>
                   <Text style={[styles.font32,{color:'#999'}]}>{i18n.t('userInfoPhone')}</Text>
                   <Text style={styles.font32}>13800138000</Text>
                </View>
            </View>

            <View style={[{flex:1,marginTop:20 * uW,backgroundColor:'#fff', paddingLeft:42 * uW, paddingRight: 42 * uW}]}>
                <View style={styles.company}>
                    <Text style={[styles.font32,{color:'#999',marginTop:44 * uW}]}>{i18n.t('userInfoCompany')}</Text>
                    <Text style={[styles.font34,{marginTop:20 * uW}]}>深圳前海云途物流有限公司</Text>
                </View>
                <View style={{marginTop:43 * uW}}>
                    {
                        this.state.list.map(item=>{
                            return <View style={styles.card}>
                                    <Text style={[styles.font34,{color:'#fff'}]}>粤B87K90</Text>
                                    <Text style={{fontSize:22 * uW,color:'#fff',marginTop:6 * uW}}>({i18n.t('majorDriver')})</Text>
                            </View>
                        })
                    }
                </View>
            </View>
        </ScrollView>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage);
//样式
const styles = StyleSheet.create({
    topBox:{
        backgroundColor:'#fff',
        height:200 * uW,
        paddingLeft:42 * uW,
        paddingRight: 42 * uW
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:100+'%',
        height:100 * uW,
        borderBottomWidth:2* uW ,
        borderColor:'#E5E5E5',
        borderStyle:'solid',
    },
    font32:{
       fontSize:32 * uW,
    },
    font34:{
        fontSize:34 * uW,
    },
    company:{
        width:100+'%',
        height:223 * uW,
        borderBottomWidth:2* uW ,
        borderColor:'#E5E5E5',
        borderStyle:'solid',
    },
    card:{
        height:168 * uW,
        width:100 + '%',
        backgroundColor:'#00BBB7',
        borderRadius:6 * uW,
        marginBottom:34 * uW,
        paddingTop:30 * uW,
        paddingLeft:35 * uW
    }
});
