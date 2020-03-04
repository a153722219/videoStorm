/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,Image,TouchableOpacity} from 'react-native';
//redux
import {connect} from "react-redux";
//导航栏
import NavigationBar from '../common/NavigationBar';
//国际化和适配
import {i18n} from '../i18n/index';
import {uW} from "../util/screenUtil";
//可选导入
//import EventBus from 'react-native-event-bus'
//import EventTypes from '../util/EventTypes'
//import ToastManager from '../common/ToastManager'


class TaskBaseInfo extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    };

    render() {
        return <View style={styles.container}>
            <View style={styles.titleView}>
                <View style={styles.titleInfo}>
                    <View style={[styles.dot,{backgroundColor:this.props.theme}]}>

                    </View>
                    <Text style={styles.title}>
                        {i18n.t('baseInfo')}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <View style={styles.detailBtn}>
                        <Text style={[styles.detail,{color:this.props.theme}]}>
                            {i18n.t('Detail')}
                        </Text>
                        <Image style={styles.icon} source={i18n.locale==='zh'?require('../assets/zh/详情.png'):require('../assets/en/详细.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.titleView}>
                    <Text style={styles.key}>
                        {i18n.t('PlanNumber')}
                    </Text>
                    <Text style={styles.value}>
                        T20191128PKLX002
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.key}>
                        {i18n.t('requireCarTime')}
                    </Text>
                    <Text style={styles.value}>
                        2019-11-30 12:00
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.key}>
                        {i18n.t('Vehicles')}
                    </Text>
                    <Text style={styles.value}>
                        粤B87K57
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <Text style={styles.key}>
                        {i18n.t('totalSites')}
                    </Text>
                    <Text style={styles.value}>
                        8
                    </Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskBaseInfo);
//样式
const styles = StyleSheet.create({
    infoBox:{
        marginTop:53*uW,
        height:306*uW,
        justifyContent:'space-between'
    },
    key:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#999"
    },
    value:{
        fontSize:30*uW,
        fontWeight:"400",
        color:"#333"
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
        color:"#333"
    },
    detailBtn:{
        flexDirection:"row",
        alignItems:"center"
    },

    detail:{
        fontSize:26*uW,
        fontWeight:"400",
        marginRight:7*uW
    },

    icon:{
        width:11*uW,
        height:18*uW,
    },

    container:{
        height:454*uW,
        marginTop:24*uW,
        backgroundColor:"#fff",
        padding:40*uW,
        paddingTop:30*uW,
        paddingBottom:23*uW
    },
    titleView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
});
