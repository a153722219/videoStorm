/**
 * Created by XiaoBai on 2020/2/28.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text,ScrollView,Image,TouchableOpacity,FlatList} from 'react-native';
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
import TaskBaseInfo from '../common/TaskBaseInfo'
import TaskLinesInfo from '../common/TaskLinesInfo'
import  setStatusBar from '../common/setStatusBar'
@setStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor:"#fff"
})
class TaskDetailPage extends Component {

    constructor(props) {
        super(props);
        this.backPress = new BackPressComponent({
            backPress: () => this.onBackPress()
        });
    }

    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    };

    //物理返回键
    onBackPress() {
        NavigationUtil.goBack(this.props.navigation)
        return true
    }

    getRightButton(){
        return <TouchableOpacity activeOpacity={0.7}>
            <View  style={styles.navBtnBox}>
                    <Image style={styles.navBtnIcon} source={i18n.locale==='zh'?require('../assets/zh/回单记录.png'):require('../assets/en/回单详细.png')}/>
                    <Text  style={styles.navBtnTitle}>{i18n.t('PODRecords')}</Text>
            </View>
        </TouchableOpacity>
    }

    _genLinesInfoItem(data){
        // console.log(index)
        return <View style={styles.LinesInfoBox}>
            {data.index===0 && <View style={styles.titleView}>
                <View style={styles.titleInfo}>
                    <View style={[styles.dot,{backgroundColor:this.props.theme}]}>

                    </View>
                    <Text style={styles.title}>
                        {i18n.t('stationInfo')}
                    </Text>
                </View>
            </View>}
            <View style={styles.addressBox}>
                 {/*#F8B422  另一种颜色*/}
                <View style={[styles.DotBox,{backgroundColor:this.props.theme}]}>
                    <Text style={styles.DotIndex}>{data.index+1}</Text>
                </View>

                <View style={styles.addressInlineBox}>
                    <Text style={styles.Bigtitle}>
                        麦迪小学
                    </Text>
                    <Text style={styles.desc} numberOfLines={3}>
                        广东省惠州市惠阳区一环北路与惠南大道交叉口东南50米
                    </Text>
                </View>
            </View>

            <View style={styles.descBox}>
                <Image style={styles.Icon} source={require("../assets/zh/装.png")}/>
                <Text style={styles.value}>{i18n.t('LoadingDetail')}</Text>

                {/*<Image style={styles.Icon} source={require("../assets/zh/交.png")}/>*/}
                {/*<Text style={styles.value}>{i18n.t('offLoadingDetail')}</Text>*/}
            </View>

            <View style={{marginTop:14*uW,height:312*uW,justifyContent:"space-between"}}>
                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('orderNo')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        T20191128PKLX002
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('requireArrTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        2019-11-30 16:00
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('requireLeaveTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        2019-11-30 16:00
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('realArrTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        2019-11-30 16:00
                    </Text>
                </View>

                <View style={styles.titleView}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={styles.titleDot}/>

                        <Text style={styles.key}>
                            {i18n.t('realLeaveTime')}

                        </Text>
                    </View>

                    <Text style={styles.value}>
                        -
                    </Text>
                </View>




            </View>



        </View>
    }



    render() {

        let navigationBar =
            <NavigationBar
                title={i18n.t('TranDetail')}
                statusBar={{}}
                style={{backgroundColor: "#fff"}}
                titleStyle={{color:"#000",fontSize:20}}
                rightButton={this.getRightButton()}
                leftButton={ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation),"#000")}
            />

        return <View style={styles.rootContainer}>
            {navigationBar}

            <ScrollView style={{flex:1}}>
                <TaskBaseInfo showDetail={false}/>

                <FlatList

                    data={[{id:1},{id:2},{id:3},{id:4}]}
                    renderItem={data=>this._genLinesInfoItem(data)}
                    keyExtractor={item=>""+item.id}
                />


            </ScrollView>

        </View>;
    }

}

const mapStateToProps = state => ({
    nav: state.nav,
    theme: state.theme.theme
});

const mapDispatchToProps = dispatch => ({});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetailPage);
//样式
const styles = StyleSheet.create({
    value:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#333"
    },

    titleDot:{
        width:10*uW,
        height:10*uW,
        borderRadius:5*uW,
        backgroundColor:"#d8d8d8",
        marginRight:15*uW
    },

    key:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#999"
    },

    Icon:{
        width:38*uW,
        height:38*uW,
        marginRight:20*uW
    },
    descBox:{
        borderStyle:"solid",
        borderTopWidth:2*uW,
        borderBottomWidth:2*uW,
        height:78*uW,
        flexDirection:"row",
        alignItems:"center",
        borderColor:"#e5e5e5"
    },

    addressBox:{
        flexDirection:"row",
        alignItems:"flex-start",
        marginTop:40*uW,
        marginBottom:40*uW
    },

    addressInlineBox:{
        paddingTop:10*uW
    },

    DotBox:{
        width:60*uW,
        height:60*uW,
        borderRadius:30*uW,
        marginRight:24*uW
    },

    Bigtitle:{
        fontSize:32*uW,
        fontWeight:"500",
        color:"#333"
    },

    desc:{
        fontSize:28*uW,
        fontWeight:"400",
        color:"#666",
        marginTop:8*uW
    },

    DotIndex:{
        color:"white",
        lineHeight:60*uW,
        textAlign:"center",
    },

    LinesInfoBox:{
        backgroundColor:"white",
        marginTop:24*uW,
        padding:30*uW,
        paddingLeft:40*uW,
        paddingRight:40*uW

    },
    titleView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
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


    navBtnIcon:{
        width:24*uW,
        height:28*uW,
        marginRight:10*uW
    },
    navBtnTitle:{
        fontSize:26*uW,
        color:"#666",
        fontWeight:"400"
    },
    rootContainer:{
        flex:1,
        backgroundColor:"#f5f5f5",
        paddingBottom:25*uW
    },
    navBtnBox:{
        flexDirection:"row",
        alignItems:"center",
        marginRight:36*uW
    },


});
