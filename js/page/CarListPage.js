/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,DeviceInfo,Image,TouchableOpacity} from 'react-native';
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
class CarListPage extends Component {

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
            backgroundColor: this.props.theme,
            barStyle: 'light-content'
        }
        let navigationBar =
            <NavigationBar
                title={i18n.t('driving')}
                statusBar={statusBar}
                style={{backgroundColor:this.props.theme}}
                // rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
            />

        return <View style={{flex:1,marginTop:DeviceInfo.isIPhoneX_deprecated?30:0,backgroundColor:'#F9F9F9'}} >
            {navigationBar}
          
            <View style={{paddingTop:24*uW}}>
                <TouchableOpacity onPress={(()=>{
    
                     NavigationUtil.goPage({},'CarDetailsPage')
                })}>
                    <View style={styles.item}>
                        <Text style={{fontSize:32 * uW,marginTop:42 * uW}}>粤B87K90</Text>
                        <View style={styles.km}>
                            <Text style={{color:'#B2B2B2',fontSize:28 * uW}}>{i18n.t('toDayMileage')}</Text>
                            <Text style={{color:this.props.theme,fontSize:28 * uW}}>128.90KM</Text>
                        </View>
                        <View style={{ flexDirection:'row',alignItems:'center'}}>
                            <Image  style={{width:24 * uW,height:28 * uW,marginRight:10 * uW}} source={i18n.locale=='zh'?require('../assets/zh/local.png'):require('../assets/en/local.png')}></Image>
                            <Text style={{fontSize:28 * uW,color:'#B2B2B2'}}>{i18n.t('nullCurrentLocal')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(CarListPage);
//样式
const styles = StyleSheet.create({
    item:{
        backgroundColor:'#fff',
        height:242 * uW,
        marginBottom:24 * uW,
        paddingLeft:46 * uW,
        
    },
    km:{
        flexDirection:'row',
        marginTop:12 * uW,
        marginBottom:30 * uW
    }
});
